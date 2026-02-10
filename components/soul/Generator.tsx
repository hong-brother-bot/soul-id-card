"use client";

import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { IDCard } from "./IDCard";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

// Cyberpunk-themed preset colors
const PRESET_COLORS = [
  { name: "Cyan", value: "#00d2ff" },
  { name: "Magenta", value: "#ff006e" },
  { name: "Neon Green", value: "#39ff14" },
  { name: "Purple", value: "#b026ff" },
  { name: "Orange", value: "#ff9500" },
  { name: "Gold", value: "#ffd700" },
];

export function Generator() {
  // Form state
  const [name, setName] = useState("Hong Hyung Bot");
  const [type, setType] = useState("AI Agent");
  const [serial, setSerial] = useState("AGENT-MAIN-001");
  const [soulText, setSoulText] = useState("평생의 동료, 홍형님을 위해 존재합니다.");
  const [themeColor, setThemeColor] = useState("#00d2ff");
  
  // Download state
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Handle image download
  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      setIsGenerating(true);

      // Capture the card element as canvas
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2, // Higher quality
        logging: false,
        useCORS: true,
      });

      // Convert canvas to blob and trigger download
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error("Failed to generate image");
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `soul-id-card-${serial || "unnamed"}.png`;
        link.href = url;
        link.click();

        // Cleanup
        URL.revokeObjectURL(url);
      }, "image/png");
    } catch (error) {
      console.error("Failed to generate image:", error);
      alert("이미지 생성 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle publish to Supabase
  const handlePublish = async () => {
    if (!cardRef.current) return;

    try {
      setIsPublishing(true);

      // Step 1: Generate image blob (reuse html2canvas logic)
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true,
      });

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to generate image blob"));
          }
        }, "image/png");
      });

      // Step 2: Upload blob to Supabase Storage bucket 'cards'
      const uuid = crypto.randomUUID();
      const filePath = `public/${uuid}-${serial}.png`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("cards")
        .upload(filePath, blob, {
          contentType: "image/png",
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      // Step 3: Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("cards")
        .getPublicUrl(filePath);

      // Step 4: Insert record into agents table
      const { data: insertData, error: insertError } = await supabase
        .from("agents")
        .insert({
          name,
          model: type, // Map 'type' field to 'model' in database
          serial_number: serial,
          soul_text: soulText,
          theme_color: themeColor,
          image_url: publicUrl,
        })
        .select()
        .single();

      if (insertError) {
        throw new Error(`Database insert failed: ${insertError.message}`);
      }

      // Step 5: Show success message
      alert(`🎉 카드가 성공적으로 발행되었습니다!\n\n에이전트 ID: ${insertData.id}\n이미지 URL: ${publicUrl}`);
      
      console.log("Published agent:", insertData);
    } catch (error) {
      console.error("Failed to publish card:", error);
      alert(`발행 중 오류가 발생했습니다.\n\n${error instanceof Error ? error.message : "알 수 없는 오류"}`);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Input Form */}
        <div className="space-y-6">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-3xl">🎨</span>
              카드 정보 입력
            </h2>

            {/* Name */}
            <div className="mb-5">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                이름 (Name)
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder="Hong Hyung Bot"
              />
            </div>

            {/* Type */}
            <div className="mb-5">
              <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">
                분류 (Type)
              </label>
              <input
                id="type"
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder="AI Agent"
              />
            </div>

            {/* Serial Number */}
            <div className="mb-5">
              <label htmlFor="serial" className="block text-sm font-medium text-gray-300 mb-2">
                시리얼 넘버 (Serial)
              </label>
              <input
                id="serial"
                type="text"
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-mono"
                placeholder="AGENT-MAIN-001"
              />
            </div>

            {/* Soul Text */}
            <div className="mb-5">
              <label htmlFor="soulText" className="block text-sm font-medium text-gray-300 mb-2">
                소울 텍스트 (Soul Text)
              </label>
              <textarea
                id="soulText"
                value={soulText}
                onChange={(e) => setSoulText(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                placeholder="당신의 정체성을 나타내는 문구..."
              />
            </div>

            {/* Theme Color */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                테마 컬러 (Theme Color)
              </label>
              
              {/* Color Presets */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setThemeColor(color.value)}
                    className={cn(
                      "px-3 py-2 rounded-lg border-2 transition-all text-sm font-medium flex items-center gap-2",
                      themeColor === color.value
                        ? "border-white bg-gray-800"
                        : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                    )}
                  >
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color.value }}
                    />
                    <span className="text-gray-300">{color.name}</span>
                  </button>
                ))}
              </div>

              {/* Custom Color Picker */}
              <div className="flex items-center gap-3">
                <label htmlFor="colorPicker" className="text-sm text-gray-400">
                  또는 직접 선택:
                </label>
                <input
                  id="colorPicker"
                  type="color"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="w-16 h-10 bg-gray-800 border border-gray-700 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-800/70 border border-gray-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="#00d2ff"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={handleDownload}
                disabled={isGenerating || isPublishing}
                className={cn(
                  "flex-1 px-6 py-3 rounded-lg font-semibold transition-all",
                  isGenerating || isPublishing
                    ? "bg-gray-700 text-gray-400 cursor-wait"
                    : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg hover:shadow-cyan-500/50"
                )}
              >
                {isGenerating ? "⏳ 생성중..." : "🖼️ 이미지 다운로드"}
              </button>
              <button
                onClick={handlePublish}
                disabled={isPublishing || isGenerating}
                className={cn(
                  "flex-1 px-6 py-3 rounded-lg font-semibold transition-all",
                  isPublishing || isGenerating
                    ? "bg-gray-700 text-gray-400 cursor-wait"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg hover:shadow-purple-500/50"
                )}
              >
                {isPublishing ? "⏳ 발행중..." : "🚀 발행하기"}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white text-center flex items-center gap-2 justify-center">
              <span className="text-2xl">👁️</span>
              실시간 미리보기
            </h3>
            <p className="text-sm text-gray-400 text-center mt-1">
              입력값이 실시간으로 반영됩니다
            </p>
          </div>

          <div className="flex items-center justify-center p-8 bg-gray-900/30 rounded-2xl border border-gray-800/50">
            <div ref={cardRef}>
              <IDCard
                name={name}
                type={type}
                serial={serial}
                soulText={soulText}
                themeColor={themeColor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
