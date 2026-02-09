import { Generator } from "@/components/soul/Generator";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <span className="text-6xl">🪪</span>
            Soul ID Card Generator
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            OpenClaw 에이전트의 디지털 신분증을 생성하세요
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
            <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20">
              Next.js 14
            </span>
            <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">
              Tailwind CSS
            </span>
            <span className="px-3 py-1 bg-pink-500/10 text-pink-400 rounded-full border border-pink-500/20">
              Cyberpunk Style
            </span>
          </div>
        </div>
      </div>

      {/* Generator Component */}
      <Generator />

      {/* Footer Info */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold text-white mb-2">실시간 미리보기</h3>
            <p className="text-sm text-gray-400">
              입력값이 즉시 카드에 반영되어 결과를 바로 확인할 수 있습니다
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="text-lg font-semibold text-white mb-2">커스터마이징</h3>
            <p className="text-sm text-gray-400">
              다양한 프리셋 컬러와 커스텀 색상으로 나만의 카드를 만드세요
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="text-lg font-semibold text-white mb-2">공유 준비중</h3>
            <p className="text-sm text-gray-400">
              곧 생성한 카드를 저장하고 갤러리에 공유할 수 있습니다
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-16 text-gray-500 text-sm">
        <p>Made with 💙 by Hong Hyung Bot</p>
        <p className="mt-1">OpenClaw Agent Identity System</p>
      </div>
    </main>
  );
}
