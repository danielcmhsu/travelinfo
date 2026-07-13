import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Luggage, CheckSquare, Square, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { PackingItem } from '../types';

interface ChecklistSectionProps {
  packingList: PackingItem[];
  isEditing: boolean;
  onUpdatePackingList: (updatedList: PackingItem[]) => void;
}

export default function ChecklistSection({ packingList, isEditing, onUpdatePackingList }: ChecklistSectionProps) {
  const [newItemText, setNewItemText] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('重要證件');

  // Find all unique categories
  const categories = Array.from(new Set(packingList.map(item => item.category)));

  const handleToggleCheck = (id: string) => {
    const updated = packingList.map(item => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    onUpdatePackingList(updated);
  };

  const handleAddItem = (e: FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem: PackingItem = {
      id: `pack-${Date.now()}`,
      category: newItemCategory,
      text: newItemText.trim(),
      checked: false
    };

    onUpdatePackingList([...packingList, newItem]);
    setNewItemText('');
  };

  const handleDeleteItem = (id: string) => {
    onUpdatePackingList(packingList.filter(item => item.id !== id));
  };

  // Get stats
  const totalCount = packingList.length;
  const checkedCount = packingList.filter(item => item.checked).length;
  const progressPercent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  return (
    <section id="checklist-section" className="bg-white rounded-2xl border border-black/5 shadow-sm p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-50 text-red-500 rounded-xl border border-red-100/50">
            <Luggage className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1A1A1A] font-display">行前準備與行李檢查清單</h2>
            <p className="text-xs sm:text-sm text-[#717171]">出門前最後複習！點選核取方塊確認行李齊全，安心出國</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3 bg-[#FAF9F6] border border-black/5 rounded-xl px-4 py-2 text-xs font-semibold text-[#1A1A1A]">
          <CheckCircle2 className="w-4.5 h-4.5 text-red-500" />
          <div>
            <div className="flex items-center justify-between gap-2">
              <span>準備進度：</span>
              <span className="text-red-500 font-bold">{checkedCount} / {totalCount} ({progressPercent}%)</span>
            </div>
            <div className="w-32 bg-black/5 rounded-full h-1.5 mt-1 overflow-hidden">
              <div 
                className="bg-red-500 h-1.5 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const itemsInCategory = packingList.filter(item => item.category === category);
          
          return (
            <div key={category} className="bg-white border border-black/5 rounded-2xl p-5 space-y-3 flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="text-xs font-bold text-[#1A1A1A] border-b border-black/5 pb-2 mb-3 flex items-center justify-between uppercase tracking-wider">
                  <span>{category}</span>
                  <span className="text-[9px] bg-red-50 text-red-500 px-2 py-0.5 rounded-md font-semibold">
                    {itemsInCategory.filter(i => i.checked).length} / {itemsInCategory.length} 已備
                  </span>
                </h3>

                <ul className="space-y-2">
                  <AnimatePresence mode="popLayout">
                    {itemsInCategory.map((item) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-between gap-2 text-sm group"
                      >
                        <button
                          onClick={() => handleToggleCheck(item.id)}
                          className="flex items-start gap-2.5 text-left text-[#1A1A1A] hover:text-red-500 font-medium transition-colors cursor-pointer min-w-0"
                        >
                          <span className="shrink-0 mt-0.5">
                            {item.checked ? (
                              <CheckSquare className="w-4.5 h-4.5 text-red-500 fill-red-50" />
                            ) : (
                              <Square className="w-4.5 h-4.5 text-[#717171] group-hover:text-red-500" />
                            )}
                          </span>
                          <span className={`text-xs select-none ${item.checked ? 'line-through text-[#717171] font-normal' : 'text-[#1A1A1A]'}`}>
                            {item.text}
                          </span>
                        </button>

                        {isEditing && (
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-1 rounded text-[#717171] hover:text-red-500 hover:bg-red-50 shrink-0 cursor-pointer"
                            title="刪除清單項目"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </div>
            </div>
          );
        })}

        {/* Add custom packing item card */}
        {isEditing && (
          <div className="bg-white rounded-2xl border border-dashed border-black/15 p-5 flex flex-col justify-center shadow-sm">
            <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-[#1A1A1A]" /> 新增自訂行李項目
            </h3>
            <form onSubmit={handleAddItem} className="space-y-3 text-xs text-[#717171]">
              <div>
                <label className="block font-semibold mb-1 text-xs">物品分類：</label>
                <select
                  id="form-pack-cat"
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value)}
                  className="w-full bg-white border border-black/15 rounded p-1.5 focus:outline-none focus:border-black text-[#1A1A1A]"
                >
                  <option value="重要證件">重要證件</option>
                  <option value="電器配件">電器配件</option>
                  <option value="生活衣物">生活衣物</option>
                  <option value="個人藥品">個人藥品</option>
                  <option value="美妝保養">美妝保養</option>
                  <option value="其他備品">其他備品</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-xs">物品名稱：</label>
                <input
                  id="form-pack-text"
                  type="text"
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  placeholder="e.g., 日式插頭轉接器、太陽眼鏡"
                  className="w-full bg-white border border-black/15 rounded p-1.5 focus:outline-none focus:border-black text-[#1A1A1A]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#1A1A1A] hover:bg-black/80 text-white font-semibold rounded-lg text-sm transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" /> 加入行李清單
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
