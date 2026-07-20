import { useState, useRef, ChangeEvent } from 'react';
import { Download, Upload, RefreshCw, Copy, Check, FileJson, AlertCircle } from 'lucide-react';
import { TripInfo } from '../types';

interface DataManagementProps {
  tripData: TripInfo;
  onImportData: (data: TripInfo) => void;
  onResetData: () => void;
}

export default function DataManagement({ tripData, onImportData, onResetData }: DataManagementProps) {
  const [copied, setCopied] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [successText, setSuccessText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tripData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${tripData.title || 'trip-config'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(tripData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        
        // Simple structural validation
        if (json && typeof json === 'object' && json.title && json.itinerary && json.hotel) {
          onImportData(json);
          setSuccessText('✅ 行程資料匯入成功！網頁已更新！');
          setErrorText('');
          setTimeout(() => setSuccessText(''), 4000);
        } else {
          throw new Error('不正確的 JSON 結構。請確認含有 title, itinerary 與 hotel。');
        }
      } catch (err: any) {
        setErrorText(`❌ 檔案格式不合：${err.message || 'JSON 解析失敗'}`);
        setSuccessText('');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // clear input
  };

  const handleResetClick = () => {
    if (window.confirm('確定要將網頁行程還原到初始設定嗎？這會清除您目前在瀏覽器中的所有修改。')) {
      onResetData();
      setSuccessText('✅ 行程已成功重置為預設東北行程！');
      setTimeout(() => setSuccessText(''), 4000);
    }
  };

  return (
    <section id="data-management-section" className="bg-white text-[#1A1A1A] rounded-2xl border border-black/5 shadow-sm p-6 sm:p-8 space-y-6">
      <div className="border-b border-black/5 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-50 text-red-500 rounded-xl border border-red-100/50">
            <FileJson className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold font-display text-[#1A1A1A]">網站資料匯出 / 備份 / 匯入管理</h2>
            <p className="text-xs sm:text-sm text-[#717171]">當您完成行程設計後，您可以匯出 JSON。未來只要部署到 GitHub Pages，即可載入此設定檔</p>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {successText && (
        <div className="bg-green-50/50 border border-green-500/10 text-green-700 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium">
          {successText}
        </div>
      )}
      {errorText && (
        <div className="bg-red-50/50 border border-red-500/10 text-red-700 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <span>{errorText}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Copy Configuration */}
        <button
          onClick={handleCopyJson}
          className="flex flex-col items-center justify-center p-5 bg-[#FAF9F6] hover:bg-black/5 rounded-xl border border-black/5 text-center cursor-pointer transition-all space-y-2 group"
        >
          {copied ? <Check className="w-6 h-6 text-green-500 animate-scale" /> : <Copy className="w-6 h-6 text-red-500 group-hover:scale-105 transition-transform" />}
          <div className="text-sm font-semibold text-[#1A1A1A]">複製行程 JSON 碼</div>
          <div className="text-[10px] text-[#717171]">將設定檔複製至剪貼簿</div>
        </button>

        {/* Download file */}
        <button
          onClick={handleExportJson}
          className="flex flex-col items-center justify-center p-5 bg-[#FAF9F6] hover:bg-black/5 rounded-xl border border-black/5 text-center cursor-pointer transition-all space-y-2 group"
        >
          <Download className="w-6 h-6 text-red-500 group-hover:scale-105 transition-transform" />
          <div className="text-sm font-semibold text-[#1A1A1A]">下載設定檔 (JSON)</div>
          <div className="text-[10px] text-[#717171]">匯出為本地 JSON 檔案</div>
        </button>

        {/* Import file */}
        <button
          onClick={handleImportClick}
          className="flex flex-col items-center justify-center p-5 bg-[#FAF9F6] hover:bg-black/5 rounded-xl border border-black/5 text-center cursor-pointer transition-all space-y-2 group"
        >
          <Upload className="w-6 h-6 text-red-500 group-hover:scale-105 transition-transform" />
          <div className="text-sm font-semibold text-[#1A1A1A]">匯入行程設定檔</div>
          <div className="text-[10px] text-[#717171]">載入先前的 JSON 備份檔</div>
        </button>

        {/* Reset settings */}
        <button
          onClick={handleResetClick}
          className="flex flex-col items-center justify-center p-5 bg-[#FAF9F6] hover:bg-red-50/10 rounded-xl border border-black/5 hover:border-red-500/20 text-center cursor-pointer transition-all space-y-2 group"
        >
          <RefreshCw className="w-6 h-6 text-red-500 group-hover:rotate-180 transition-transform duration-500" />
          <div className="text-sm font-semibold text-[#1A1A1A]">還原為預設行程</div>
          <div className="text-[10px] text-red-500">清空目前所有修改內容</div>
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="text-xs text-[#717171] font-normal leading-relaxed pt-2">
        ℹ️ <b>GitHub Pages 部署秘訣：</b> 網頁建立好之後，直接將本 React 專案打包（執行 <code>npm run build</code>）。將產出的 <code>dist</code> 資料夾上傳到您的 GitHub Repository，啟用 GitHub Pages 功能，一分鐘內就完成全球免費公開部署！任何人打開連結即可獲得一流的行動裝置流暢體驗。
      </div>
    </section>
  );
}
