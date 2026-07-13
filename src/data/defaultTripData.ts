import { TripInfo } from '../types';

export const defaultTripData: TripInfo = {
  title: "陸奧星空與溫泉秋意：客製東北６日",
  subtitle: "2026 家族客製精緻之旅 · 仙台 / 奧入瀨溪流 / 青森",
  startDate: "2026-07-22",
  endDate: "2026-07-27",
  destination: "日本東北 (Sendai, Aomori & Akita, Japan)",
  announcement: "📢 各位團員注意！請務必於 07/22 早上 07:45 前抵達桃園國際機場第二航廈長榮航空櫃檯辦理登機（BR118 班機，10:15 起飛）。東北地區夏季氣候舒爽，早晚山區仍可能有溫差，建議攜帶輕便防風外套與防曬、雨具。記得提早完成 Visit Japan Web 填寫以利通關！",
  bannerUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1600&q=80",
  myMapsIframeUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1567117.7554906902!2d139.81533939999998!3d39.70361535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f8f3c3b03657cd7%3A0x6b45a339943632f0!2sTohoku!5e0!3m2!1sen!2sjp!4v1710000000000!5m2!1sen!2sjp",
  groupMembers: [
    { name: "阿強 (主辦人)", avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80", role: "財務/導遊" },
    { name: "小美", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80", role: "拍照/美食擔當" },
    { name: "大明", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80", role: "人肉GPS/苦力" },
    { name: "莉莉", avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80", role: "氣氛製造/買單王" }
  ],
  hotels: [
    {
      name: "仙臺國際飯店 (Sendai International Hotel)",
      address: "宮城縣仙台市青葉區中央4-6-1",
      checkInDate: "2026-07-22",
      checkInTime: "15:00",
      checkOutDate: "2026-07-23",
      checkOutTime: "11:00",
      bookingRef: "BR118-SEN-9821",
      phone: "+81-22-268-1111",
      website: "https://www.janhotel.co.jp/sendai-international/",
      googleMapsUrl: "https://maps.google.com/?q=Sendai+International+Hotel",
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      notes: "鄰近仙台車站，周邊購物與逛街極為便利。晚上可就近步行在仙台站周邊，品嚐當地經典烤牛舌（牛舌料理預算每人約 ¥3500）。",
      amenities: ["鄰近仙台車站步行5分", "免費高速 Wi-Fi", "高級盥洗用品", "舒適大型睡床", "24小時接待櫃檯"]
    },
    {
      name: "鳴子溫泉-鳴子觀光飯店 (Naruko Kanko Hotel)",
      address: "宮城縣大崎市鳴子溫泉湯元41",
      checkInDate: "2026-07-23",
      checkInTime: "15:00",
      checkOutDate: "2026-07-24",
      checkOutTime: "10:00",
      bookingRef: "ON-NAR-20260723",
      phone: "+81-229-83-2241",
      website: "http://www.narukokankohotel.co.jp/",
      googleMapsUrl: "https://maps.google.com/?q=Naruko+Kanko+Hotel",
      imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
      notes: "傳統日式溫泉旅館。擁有頂級的天然美肌之湯大浴池與露天風呂。晚餐為飯店精緻日式會席料理或日式自助餐。",
      amenities: ["天然溫泉大浴池", "露天風呂", "精緻日式會席晚餐", "溫泉街散策", "傳統榻榻米客房"]
    },
    {
      name: "雫石王子飯店 (Shizukuishi Prince Hotel)",
      address: "岩手縣岩手郡雫石町高倉溫泉",
      checkInDate: "2026-07-24",
      checkInTime: "15:00",
      checkOutDate: "2026-07-25",
      checkOutTime: "11:00",
      bookingRef: "PR-SHI-20260724",
      phone: "+81-19-693-1111",
      website: "https://www.princehotels.co.jp/shizukuishi/",
      googleMapsUrl: "https://maps.google.com/?q=Shizukuishi+Prince+Hotel",
      imageUrl: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
      notes: "位於高倉山麓的休閒度假飯店，設有著名高倉溫泉露天風呂。晚上安排搭乘「雫石星空銀河纜車」直達 730 米山頂站，觀賞一覽無遺的滿天星斗與璀璨銀河（若因天候因素未開行，現場退費每人 ¥1000 日圓）。",
      amenities: ["雫石銀河纜車直達", "天然高倉溫泉", "度假村美景", "免費高速 Wi-Fi", "高規格西式客房"]
    },
    {
      name: "十和田莊溫泉飯店 (Towadaso Hotel)",
      address: "青森縣十和田市大字奥瀬字十和田湖畔休屋340",
      checkInDate: "2026-07-25",
      checkInTime: "15:00",
      checkOutDate: "2026-07-26",
      checkOutTime: "10:00",
      bookingRef: "TW-TOW-20260725",
      phone: "+81-176-75-2221",
      website: "http://www.towadaso.co.jp/",
      googleMapsUrl: "https://maps.google.com/?q=Towadaso+Hotel",
      imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
      notes: "位於絕美十和田湖畔休屋地區，是遊覽奧入瀨溪流與瞰湖展望台的完美基地。飯店內擁有氣勢磅礡的大浴場，晚餐享用極具東北風情的豐盛會席料理。",
      amenities: ["十和田湖畔步行3分", "寬敞和風大浴場", "十和田在地食材會席", "日式和風客房", "免費停車場"]
    },
    {
      name: "青森 ART 飯店 (Art Hotel Aomori)",
      address: "青森縣青森市本町2-1-26",
      checkInDate: "2026-07-26",
      checkInTime: "15:00",
      checkOutDate: "2026-07-27",
      checkOutTime: "11:00",
      bookingRef: "AR-AOM-20260726",
      phone: "+81-17-775-7111",
      website: "https://www.art-aomori.com/",
      googleMapsUrl: "https://maps.google.com/?q=Art+Hotel+Aomori",
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      notes: "位於青森市中心繁華地段，交通便利。步行即可抵達睡魔之家（Wa Rasse）與當地熱門購物街區。早餐提供豐富 of 青森特產海鮮與在地農產品自助餐。",
      amenities: ["市中心黃金地段", "精緻青森特產自助早餐", "免費高速 Wi-Fi", "現代化舒適客房", "舒適衛浴設施"]
    },
    {
      name: "溫慢的家 (Sweet Home)",
      address: "台灣 (桃園機場返家)",
      checkInDate: "2026-07-27",
      checkInTime: "19:45",
      checkOutDate: "2026-07-27",
      checkOutTime: "23:59",
      bookingRef: "HOME-SWEET-HOME",
      phone: "-",
      website: "https://maps.google.com/?q=Taoyuan+Airport",
      googleMapsUrl: "https://maps.google.com/?q=Taoyuan+Airport",
      imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      notes: "帶著滿滿的手信、名產、蘋果點心與難忘的東北星空溫泉回憶，搭乘 BR121 航班（16:15 啟程，19:45 抵達桃園）返抵台灣，回到溫暖的家。",
      amenities: ["溫馨私人空間", "無限珍貴回憶", "滿滿青森蘋果伴手禮"]
    }
  ],
  itinerary: [
    {
      dayNumber: 1,
      date: "2026-07-22",
      theme: "啟程飛往「杜之都」仙台市 & 享用經典和牛牛舌晚餐",
      items: [
        {
          id: "d1-1",
          time: "07:45 - 10:15",
          title: "桃園機場辦理登機與報到",
          location: "桃園國際機場第二航廈 (TPE) 長榮航空櫃檯",
          category: "transport",
          description: "搭乘長榮航空 BR118 航班前往仙台。請提早於 07:45 在機場集合辦理登機與行李託運手續。",
          googleMapsUrl: "https://maps.google.com/?q=Taoyuan+International+Airport",
          cost: "機票費用已預付"
        },
        {
          id: "d1-2",
          time: "10:15 - 14:25",
          title: "搭乘 BR118 飛往仙台 🛫",
          location: "桃園國際機場 (TPE) -> 仙台國際機場 (SDJ)",
          category: "transport",
          description: "搭乘長榮航空 BR118 舒適客機。航程約 3 小時 10 分鐘，機上提供精緻機上簡餐。抵達仙台後，辦理入境通關手續與提取行李。",
          googleMapsUrl: "https://maps.google.com/?q=Sendai+Airport"
        },
        {
          id: "d1-3",
          time: "15:00 - 16:30",
          title: "辦理入住 & 飯店小憩",
          location: "仙臺國際飯店 (Sendai International Hotel)",
          category: "hotel",
          description: "辦理入住登記與行李寄放。飯店鄰近仙台車站與繁華商業區，生活與購物非常方便，可先行稍微洗漱或在房內小歇。",
          googleMapsUrl: "https://maps.google.com/?q=Sendai+International+Hotel",
          cost: "住宿費用已預付"
        },
        {
          id: "d1-4",
          time: "18:00 - 20:30",
          title: "仙台名物晚餐：牛舌料理饗宴 🥩",
          location: "伊達之牛舌本舖 仙台站前本店",
          category: "food",
          description: "品嚐仙台最具代表性的碳烤厚切牛舌。厚實多汁、脆彈有嚼勁，搭配麥飯與牛尾高湯（人均預算約 ¥3500），香氣逼人，徹底感受仙台的美食魅力！",
          googleMapsUrl: "https://maps.google.com/?q=Date+no+Gyutan+Honpo+Sendai+Station",
          cost: "每人約 ¥3,500"
        }
      ]
    },
    {
      dayNumber: 2,
      date: "2026-07-23",
      theme: "日本三景松島海灣遊船、五大堂 & 浪漫大正風情銀山溫泉",
      items: [
        {
          id: "d2-1",
          time: "08:30 - 10:30",
          title: "日本三景：松島海灣遊船 🛳️",
          location: "松島灣遊覽船乘船處",
          category: "sightseeing",
          description: "松島位列日本三景之一。搭乘遊覽船穿行於擁有約 260 個大小島嶼、天然黑松錯落的松島灣內，海鷗飛翔相隨，海景波光粼粼，景色美不勝收。",
          googleMapsUrl: "https://maps.google.com/?q=Matsushima",
          cost: "船票已含在團費中"
        },
        {
          id: "d2-2",
          time: "10:45 - 11:30",
          title: "參訪松島五大堂 ⛩️",
          location: "松島五大堂",
          category: "sightseeing",
          description: "建在突出於松島灣小島上的五大堂具有千年歷史，為日本重要文化財。木造屋頂古樸優雅，透露出歷史印記，在此可眺望整片明媚的松島港灣。",
          googleMapsUrl: "https://maps.google.com/?q=Godaido"
        },
        {
          id: "d2-3",
          time: "12:00 - 13:30",
          title: "午餐：極上米澤牛料理 🥩",
          location: "米澤牛名店",
          category: "food",
          description: "午間特別安排享用日本三大和牛之一的米澤牛套餐。肉質細緻、油花分布極為均勻，輕輕炙烤或涮過，入口即化，口感綿密（預算每人約 ¥6500）。",
          googleMapsUrl: "https://maps.google.com/?q=Matsushima+restaurants",
          cost: "每人約 ¥6,500"
        },
        {
          id: "d2-4",
          time: "13:45 - 14:30",
          title: "免稅店購物採買 🛍️",
          location: "在地指定免稅店",
          category: "shopping",
          description: "短暫停靠免稅店，方便團員選購日本熱門藥妝、保養品、免稅電器及在地伴手禮，享有優惠退稅。",
          cost: "視個人消費而定"
        },
        {
          id: "d2-5",
          time: "15:15 - 17:00",
          title: "大正浪漫：銀山溫泉街散策 ♨️",
          location: "山形縣尾花澤市銀山溫泉",
          category: "sightseeing",
          description: "彷彿走入宮崎駿《千與千尋》的童話世界。沿著銀山川兩側林立著古老的三、四層木結構溫泉旅館，洋溢著大正時期的浪漫氣息。可漫步至最內側欣賞白銀瀑布與公園。",
          googleMapsUrl: "https://maps.google.com/?q=Ginzan+Onsen"
        },
        {
          id: "d2-6",
          time: "18:00 - 21:00",
          title: "入住鳴子溫泉 & 享用溫泉大餐",
          location: "鳴子觀光飯店 (Naruko Kanko Hotel)",
          category: "hotel",
          description: "入住著名的鳴子溫泉鄉。換上傳統日式浴衣，享用飯店提供的極致精緻自助餐或精美和風會席料理，隨後泡在天然美肌之湯中放鬆一天的疲憊。",
          googleMapsUrl: "https://maps.google.com/?q=Naruko+Kanko+Hotel",
          cost: "一泊二食已含在團費"
        }
      ]
    },
    {
      dayNumber: 3,
      date: "2026-07-24",
      theme: "陸奧小京都角館、深邃湛藍田澤湖 & 高空璀璨雫石星空纜車",
      items: [
        {
          id: "d3-1",
          time: "08:30 - 11:30",
          title: "陸奧小京都：角館武家屋敷 🏯",
          location: "秋田縣仙北市角館町",
          category: "sightseeing",
          description: "江戶時代高階武士居住的宅邸聚落，黑色木質圍牆與古老櫻花樹相映。被列入日本重要傳統建築物群保存地區，漫步其中，細細感受古意盎然的歷史底蘊。",
          googleMapsUrl: "https://maps.google.com/?q=Kakunodate+Samurai+District"
        },
        {
          id: "d3-2",
          time: "12:00 - 13:00",
          title: "午餐：東北在地御膳料理 🍱",
          location: "角館當地餐館",
          category: "food",
          description: "在幽雅的日式餐館享用東北時時在地特產製成的精緻御膳，包括秋田名物烤米棒、比內地雞等精緻食材（預算每人約 ¥2500）。",
          googleMapsUrl: "https://maps.google.com/?q=Kakunodate+restaurants",
          cost: "每人約 ¥2,500"
        },
        {
          id: "d3-3",
          time: "13:30 - 15:30",
          title: "田澤湖畔散策 & 眺望金色辰子姬像 🧜‍♀️",
          location: "秋田縣田澤湖、辰子姬像",
          category: "sightseeing",
          description: "田澤湖是日本第一深湖（深達 423.4 公尺），湖水呈現神祕多變的琉璃湛藍色。佇立在湖畔的金色「辰子姬像」閃閃發光，傾聽關於美麗少女為永保青春而化身為龍的淒美古老傳說。",
          googleMapsUrl: "https://maps.google.com/?q=Lake+Tazawa"
        },
        {
          id: "d3-4",
          time: "16:30 - 18:00",
          title: "入住雫石王子飯店 🏨",
          location: "雫石王子飯店 (Shizukuishi Prince Hotel)",
          category: "hotel",
          description: "抵達高倉山腳下的高檔休閒度假飯店辦理入住，可在房內欣賞窗外壯麗的自然景致，或搶先體驗露天溫泉「高倉溫泉」。",
          googleMapsUrl: "https://maps.google.com/?q=Shizukuishi+Prince+Hotel",
          cost: "住宿費用已預付"
        },
        {
          id: "d3-5",
          time: "19:30 - 21:00",
          title: "特別安排：雫石星空銀河纜車體驗 🌌",
          location: "雫石銀河纜車",
          category: "leisure",
          description: "搭乘銀河纜車直上海拔 730 公尺的山頂。遠離城市喧囂與光害，清晨乾淨的空氣中鋪展出近在咫尺、觸手可及的滿天璀璨繁星與壯麗銀河，極具震撼與浪漫。（如遇強風雨天未開行，將現場退費每人日幣 1000 元）。",
          googleMapsUrl: "https://maps.google.com/?q=Shizukuishi+Prince+Hotel",
          cost: "纜車票已含 (若天候不佳退 ¥1000)"
        }
      ]
    },
    {
      dayNumber: 4,
      date: "2026-07-25",
      theme: "絕美十和田湖、日本第一美溪奧入瀨溪流森林浴",
      items: [
        {
          id: "d4-1",
          time: "09:30 - 11:30",
          title: "十和田湖畔 & 發荷峠展望台 ⛰️",
          location: "十和田湖、發荷峠展望台",
          category: "sightseeing",
          description: "十和田湖是位於海拔 400 公尺山上的雙層火山湖。登上發荷峠展望台，可以將深達 327 公尺、透明剔透、宛如巨大藍寶石的十和田湖全景盡收眼底，感受高空震撼美景。",
          googleMapsUrl: "https://maps.google.com/?q=Lake+Towada"
        },
        {
          id: "d4-2",
          time: "12:00 - 13:00",
          title: "午餐：東北風味限定料理 🍲",
          location: "十和田湖畔餐廳",
          category: "food",
          description: "在湖畔享用東北風味特餐，品嚐鮮嫩美味的鹽烤姬鱒魚或特製陶板燒，一邊眺望湖光山色（預算每人約 ¥2500）。",
          googleMapsUrl: "https://maps.google.com/?q=Lake+Towada+restaurants",
          cost: "每人約 ¥2,500"
        },
        {
          id: "d4-3",
          time: "13:30 - 16:30",
          title: "漫步奧入瀨溪流 (日本第一美溪) 🥾",
          location: "奧入瀨溪流 (銚子大瀧、阿修羅之流)",
          category: "sightseeing",
          description: "東北人氣第一的自然祕境，全長 14 公里的優美溪流，漫步其中進行森林浴。溪水在奇石、青苔與茂密林木間奔流，銚子大瀧與阿修羅之流的澎湃水花，交織出如水彩畫般的唯美奇景。",
          googleMapsUrl: "https://maps.google.com/?q=Oirase+Gorge"
        },
        {
          id: "d4-4",
          time: "17:00 - 21:00",
          title: "入住十和田莊溫泉飯店 & 溫泉宴會",
          location: "十和田莊溫泉飯店",
          category: "hotel",
          description: "入住十和田湖畔歷史悠久的傳統溫泉飯店。擁有極具氣勢的和風大浴場，晚餐品嚐豐盛的日式溫泉宴席，度過放鬆祥和的溫泉之夜。",
          googleMapsUrl: "https://maps.google.com/?q=Towadaso+Hotel",
          cost: "一泊二食已含"
        }
      ]
    },
    {
      dayNumber: 5,
      date: "2026-07-26",
      theme: "八甲田山高空纜車、青森採果體驗 & 弘前天守閣歷史之旅",
      items: [
        {
          id: "d5-1",
          time: "09:00 - 10:30",
          title: "八甲田山空中纜車 🚡",
          location: "八甲田山纜車山麓站",
          category: "sightseeing",
          description: "搭乘高空空中纜車（單程約 10 分鐘，往返 20 分鐘）登上山頂。可 360 度俯瞰八甲田連峰的雄偉群山，感受漫步雲端與空中翱翔的震撼視覺享受。",
          googleMapsUrl: "https://maps.google.com/?q=Hakkoda+Ropeway",
          cost: "已含在團費"
        },
        {
          id: "d5-2",
          time: "11:00 - 12:30",
          title: "青森採果體驗：現採現吃！ 🍎",
          location: "青森在地觀光果園",
          category: "leisure",
          description: "在被譽為「水果王國」的青森體驗採果樂趣。親手摘採最當季、最飽滿香甜的青森水果（櫻桃/水蜜桃/蘋果等），一邊摘、一邊大口現吃，樂趣無窮！",
          googleMapsUrl: "https://maps.google.com/?q=Aomori+orchards"
        },
        {
          id: "d5-3",
          time: "13:00 - 14:00",
          title: "午餐：東北傳統鄉土料理 🍲",
          location: "弘前當地餐館",
          category: "food",
          description: "在弘前古城周邊品嚐正宗的青森割烹，品嚐「貝燒味噌」、傳統蕎麥麵等極具地方色彩的鄉土美味（預算每人約 ¥3000）。",
          googleMapsUrl: "https://maps.google.com/?q=Hirosaki+restaurants",
          cost: "每人約 ¥3,000"
        },
        {
          id: "d5-4",
          time: "14:15 - 16:30",
          title: "國家重要文化財：弘前城與天守閣 🏯",
          location: "弘前公園、弘前城",
          category: "sightseeing",
          description: "弘前城是日本現存十二天守之一，具有 400 年歷史。漫步在佔地廣闊的弘前公園，欣賞保存完好的城牆、護城河與高聳的天守閣，感受津輕籓政時期的武士歷史榮光。",
          googleMapsUrl: "https://maps.google.com/?q=Hirosaki+Park"
        },
        {
          id: "d5-5",
          time: "17:30 - 18:30",
          title: "入住青森 ART 飯店",
          location: "青森 ART 飯店 (Art Hotel Aomori)",
          category: "hotel",
          description: "入住位於青森市中心的現代化飯店，周邊生活便利，鄰近購物區與青森港口，方便晚上出門逛街。",
          googleMapsUrl: "https://maps.google.com/?q=Art+Hotel+Aomori",
          cost: "已預付"
        },
        {
          id: "d5-6",
          time: "19:00 - 21:30",
          title: "晚餐：日式風味燒肉饗宴 + 飲料無限暢飲 🍻",
          location: "青森市中心精緻燒肉店",
          category: "food",
          description: "在青森市區品嚐鮮美香郁的日式燒肉宴，搭配多款軟性飲料無限暢飲（預算每人約 ¥5000）。肉品滋滋作響，與家人朋友們共同慶祝這段美好的東北回憶！",
          googleMapsUrl: "https://maps.google.com/?q=Aomori+Station+restaurants",
          cost: "每人約 ¥5,000"
        }
      ]
    },
    {
      dayNumber: 6,
      date: "2026-07-27",
      theme: "驚艷青森睡魔祭文化、最新綜合購物商場購物 & 平安返台",
      items: [
        {
          id: "d6-1",
          time: "09:00 - 10:45",
          title: "驚艷青森：睡魔之家 Wa Rasse 🏮",
          location: "睡魔之家 Wa Rasse",
          category: "sightseeing",
          description: "近距離欣賞青森睡魔祭中實際登場、色彩奪目的巨型睡魔紙燈籠。細緻的手工工藝與逼真的武士神態令人震撼。館內伴隨著三味線、笛子等傳統祭典音樂，氣氛熱烈無比。",
          googleMapsUrl: "https://maps.google.com/?q=Nebuta+Museum+Wa+Rasse",
          cost: "門票已含"
        },
        {
          id: "d6-2",
          time: "11:00 - 13:00",
          title: "最新：青森 ciina ciina 購物中心 (午餐自理) 🛍️",
          location: "青森 ciina ciina 綜合商場",
          category: "shopping",
          description: "2024 年 12 月新開幕的超人氣購物中心，鄰近唐吉訶德，融合日系服裝、雜貨、藥妝與眾多美食名店。可在此自由採購著名的青森蘋果乾、蘋果派等名產，並自行品嚐喜愛的美食午餐。",
          googleMapsUrl: "https://maps.google.com/?q=ciina+ciina+Aomori"
        },
        {
          id: "d6-3",
          time: "13:30 - 14:15",
          title: "前往青森機場",
          location: "青森市區 -> 青森機場 (AOJ)",
          category: "transport",
          description: "搭乘接駁巴士前往青森機場，準備辦理登機返台手續。",
          googleMapsUrl: "https://maps.google.com/?q=Aomori+Airport"
        },
        {
          id: "d6-4",
          time: "14:15 - 16:15",
          title: "機場通關與最後採購",
          location: "青森機場長榮航空櫃檯",
          category: "transport",
          description: "在櫃檯辦理登機與行李託運手續。通關後，可在青森機場免稅店進行最後的青森特產採買（白色戀人、青森蘋果美酒等）。"
        },
        {
          id: "d6-5",
          time: "16:15 - 19:45",
          title: "搭乘長榮航空 BR121 返台 🛬",
          location: "青森機場 (AOJ) -> 桃園國際機場 (TPE)",
          category: "transport",
          description: "搭乘 BR121 返台班機，航程約 4 小時 30 分鐘，機上提供精緻餐飲。預計 19:45 抵達桃園國際機場，返回溫暖的家，滿載星空、溫泉與蘋果的芳甜回憶，圓滿結束令人難忘的陸奧精緻東北 6 日遊！",
          googleMapsUrl: "https://maps.google.com/?q=Taoyuan+International+Airport"
        }
      ]
    }
  ],
  restaurants: [
    {
      id: "rest-1",
      name: "伊達之牛舌本舖 仙台站前本店 (Date no Gyutan)",
      cuisine: "日式烤牛舌 / 東北鄉土料理",
      priceRange: "medium",
      recommendedDishes: ["特厚芯牛舌定食 (極厚芯たん定食)", "鹽烤與味噌烤雙拼牛舌", "牛舌香腸", "牛尾高湯 (テールスープ)"],
      address: "宮城縣仙台市青葉區中央4-10-11",
      googleMapsUrl: "https://maps.google.com/?q=Date+no+Gyutan+Honpo+Sendai+Station",
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80",
      notes: "第一晚抵達仙台時的晚餐首選！碳烤牛舌是仙台最知名的美食，厚度十足，外焦香內軟彈多汁。搭配豐富高纖的麥飯與清甜暖心的牛尾湯，是令人驚嘆的美味。"
    },
    {
      id: "rest-2",
      name: "日本三大和牛：米澤牛名店 (Yonezawa Beef)",
      cuisine: "和牛燒肉 / 壽喜燒 / 火鍋",
      priceRange: "high",
      recommendedDishes: ["米澤牛壽喜燒", "米澤牛沙朗牛排", "炙燒和牛握壽司"],
      address: "宮城縣松島海岸周邊合作和牛料理店",
      googleMapsUrl: "https://maps.google.com/?q=Yonezawa+Beef",
      imageUrl: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=400&q=80",
      notes: "第二日午餐特別安排日本著名三大和牛之一的米澤牛。肉質大理石紋油花極為細膩，入口即化，肉味濃郁，讓人體驗舌尖上的極致奢華。"
    },
    {
      id: "rest-3",
      name: "津輕割烹 菊富士 (Kikufuji Hirosaki)",
      cuisine: "弘前割烹 / 津輕鄉土料理",
      priceRange: "medium",
      recommendedDishes: ["貝燒味噌 (けの汁)", "弘前日式蕎麥麵", "青森在地櫻花蘋果派", "津輕生魚片拼盤"],
      address: "青森縣弘前市坂本町1",
      googleMapsUrl: "https://maps.google.com/?q=Kikufuji+Hirosaki",
      imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=400&q=80",
      notes: "第五天遊覽弘前古城時的首選午餐餐館。擁有極高的評價，主打傳承百年的津輕割烹料理。特別推薦貝殼燒味噌，是將味噌與雞蛋在扇貝殼上燉煮，非常具有在地風味。"
    },
    {
      id: "rest-4",
      name: "青森風味炭火燒肉 (Yakiniku Aomori)",
      cuisine: "日式炭火烤肉 / 暢飲套餐",
      priceRange: "medium",
      recommendedDishes: ["精選黑毛牛五花", "青森厚切豬里肌", "各式新鮮生啤與軟性飲料暢飲"],
      address: "青森縣青森市本町 (緊鄰青森 ART 飯店)",
      googleMapsUrl: "https://maps.google.com/?q=Yakiniku+Aomori",
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80",
      notes: "第五晚在青森市區的團員烤肉慶祝晚餐。高品質的炭火燒肉，油脂在烤盤上滋滋作響，搭配清爽的沙拉與各式汽水、果汁暢飲，氣氛十分歡樂熱鬧！"
    }
  ],
  packingList: [
    { id: "p-1", category: "重要證件", text: "護照 (效期需 6 個月以上)", checked: true },
    { id: "p-2", category: "重要證件", text: "Visit Japan Web 條碼與截圖", checked: true },
    { id: "p-3", category: "重要證件", text: "日圓現金 (建議每人換 3-5 萬日圓現鈔零錢)", checked: false },
    { id: "p-4", category: "重要證件", text: "海外消費高回饋雙幣信用卡 (至少兩張備用)", checked: false },
    { id: "p-5", category: "重要證件", text: "電子機票 & 飯店預訂憑證 (手機儲存或列印)", checked: false },
    { id: "p-6", category: "電器配件", text: "行動電源 (注意：須放隨身手提行李，不可託運)", checked: false },
    { id: "p-7", category: "電器配件", text: "手機充電線 & 萬用充電插頭", checked: false },
    { id: "p-8", category: "電器配件", text: "日本上網 SIM 卡 / eSIM (出發前確認開通)", checked: false },
    { id: "p-9", category: "生活衣物", text: "輕便薄外套 / 防風外套 (東北山區早晚稍偏冷)", checked: false },
    { id: "p-10", category: "生活衣物", text: "好穿好走的運動鞋 (奧入瀨溪流步道散步、角館武家屋敷行走多)", checked: false },
    { id: "p-11", category: "生活衣物", text: "折疊雨傘 (山區氣候多變，晴雨兩用備用)", checked: false },
    { id: "p-12", category: "個人藥品", text: "隨身常備藥 (暈車藥、感冒藥、胃藥、止痛藥)", checked: false },
    { id: "p-13", category: "其他備品", text: "保濕乳液/護唇膏、遮陽帽、太陽眼鏡", checked: false }
  ]
};
