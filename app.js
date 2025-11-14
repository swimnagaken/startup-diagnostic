        const { useState } = React;

        // アイコンコンポーネント（lucide-reactの代わり）
        const ChevronLeft = () => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
        );

        const ChevronRight = () => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        );

        const CheckCircle = ({ className = "" }) => (
            <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
        );

        function StartupDiagnostic() {
            const [currentStep, setCurrentStep] = useState(0);
            const [formData, setFormData] = useState({
                stage: '',
                businessType: '',
                corporationType: '',
                hasExperience: '',
                industry: '',
                industryCategory: '',
                businessModelClear: '',
                targetCustomerClear: '',
                competitorAnalysis: '',
                initialInvestmentEstimated: '',
                initialInvestmentAmount: '',
                capitalAmount: '',
                selfFundingRatio: '',
                externalFunding: [],
                fundingKnowledge: '',
                businessPlanStatus: '',
                financialPlanStatus: '',
                breakEvenKnown: '',
                permitKnown: '',
                procedureUnderstanding: '',
                accountingPreparation: '',
                salesChannel: '',
                webMarketingNeed: '',
                cofounder: '',
                employmentPlan: '',
                riskAssessment: '',
                startTiming: '',
                biggestChallenge: [],
                supportNeeds: [],
                expertNeeds: [],
                name: '',
                email: '',
                phone: '',
                otherComments: ''
            });
            const [showResult, setShowResult] = useState(false);

            // 業種カテゴリと詳細業種のマッピング
            const industryCategories = {
                'IT・デジタル関連': [
                    'Webサービス・アプリ開発',
                    'システム開発・受託開発',
                    'SaaS・クラウドサービス',
                    'AI・データ分析',
                    'ゲーム開発',
                    'IT・DXコンサルティング'
                ],
                '製造・ものづくり': [
                    '金属加工・機械製造',
                    '電子部品・精密機器',
                    '食品製造・加工',
                    '繊維・アパレル製造',
                    '工芸品・伝統産業',
                    'その他製造業'
                ],
                '農林水産業': [
                    '農業（米・野菜・果樹など）',
                    '畜産業',
                    '林業',
                    '水産業・養殖業',
                    '農業関連サービス（6次産業化含む）'
                ],
                '建設・不動産': [
                    '建設・土木',
                    'リフォーム・リノベーション',
                    '不動産仲介・管理',
                    '建築設計・デザイン',
                    '住宅関連サービス'
                ],
                '小売・EC': [
                    '実店舗小売（食品）',
                    '実店舗小売（雑貨・衣料品）',
                    '実店舗小売（その他）',
                    'ECサイト運営',
                    '卸売業'
                ],
                '飲食': [
                    'レストラン・カフェ',
                    '居酒屋・バー',
                    'テイクアウト・デリバリー専門',
                    'キッチンカー',
                    '食品製造小売（パン・菓子など）',
                    'ケータリング'
                ],
                '教育・人材': [
                    '学習塾・予備校',
                    'オンライン教育',
                    '習い事教室（音楽・芸術・スポーツなど）',
                    '企業研修・社員教育',
                    '人材紹介・派遣',
                    'キャリアコンサルティング'
                ],
                '医療・福祉・美容': [
                    'クリニック・診療所',
                    '歯科医院',
                    '訪問看護・介護',
                    'デイサービス・介護施設',
                    '美容室・理容室',
                    'エステ・リラクゼーション',
                    '整体・マッサージ',
                    'フィットネス・ジム'
                ],
                '専門サービス': [
                    '経営コンサルティング',
                    'マーケティング・広告',
                    'デザイン・クリエイティブ',
                    '士業（税理士・社労士・行政書士など）',
                    '翻訳・通訳'
                ],
                '観光・レジャー': [
                    '宿泊施設（ホテル・旅館・ゲストハウス）',
                    '観光関連サービス',
                    'イベント企画・運営',
                    'レジャー施設運営',
                    '旅行業'
                ],
                '生活関連サービス': [
                    'クリーニング',
                    '清掃・ハウスクリーニング',
                    '便利屋・代行サービス',
                    'ペット関連サービス',
                    '冠婚葬祭関連'
                ],
                '運輸・物流': [
                    '運送業',
                    '倉庫業',
                    '配送代行'
                ],
                'メディア・エンターテインメント': [
                    '動画制作・映像制作',
                    '出版・編集',
                    '音楽・エンターテインメント',
                    'インフルエンサー・クリエイター'
                ],
                '環境・エネルギー': [
                    '再生可能エネルギー',
                    '環境コンサルティング',
                    'リサイクル・廃棄物処理'
                ],
                'その他': ['その他']
            };

            // ステップ定義（条件分岐含む）
            const getSteps = () => {
                const steps = [
                    { id: 'stage', title: '現在の状況' },
                    { id: 'businessType', title: '事業形態' },
                ];

                // 法人の場合は詳細質問を追加
                if (['株式会社', '合同会社', 'その他の法人形態'].includes(formData.businessType)) {
                    steps.push({ id: 'corporationDetails', title: '法人詳細' });
                }

                steps.push({ id: 'industry', title: '業種' });

                // 業種別の詳細質問
                if (formData.industryCategory && ['IT・デジタル関連', '飲食', '教育・人材'].includes(formData.industryCategory)) {
                    steps.push({ id: 'industryDetails', title: '業種詳細' });
                }

                steps.push(
                    { id: 'businessModel', title: '事業内容' },
                    { id: 'funding', title: '資金計画' }
                );

                // 外部資金が必要な場合は詳細質問
                if (formData.selfFundingRatio && formData.selfFundingRatio !== '100%（全額自己資金）') {
                    steps.push({ id: 'fundingDetails', title: '資金調達詳細' });
                }

                steps.push(
                    { id: 'businessPlan', title: '事業計画書' },
                    { id: 'procedures', title: '許認可・手続き' },
                    { id: 'marketing', title: 'マーケティング' },
                    { id: 'organization', title: '人材・組織' },
                    { id: 'risk', title: 'リスク管理' },
                    { id: 'support', title: '支援ニーズ' },
                    { id: 'contact', title: '連絡先（任意）' }
                );

                return steps;
            };

            const steps = getSteps();
            const totalSteps = steps.length;
            const progress = ((currentStep + 1) / totalSteps) * 100;

            const handleInputChange = (field, value) => {
                setFormData(prev => ({ ...prev, [field]: value }));
            };

            const handleMultiSelect = (field, value) => {
                setFormData(prev => {
                    const current = prev[field] || [];
                    if (current.includes(value)) {
                        return { ...prev, [field]: current.filter(v => v !== value) };
                    } else {
                        return { ...prev, [field]: [...current, value] };
                    }
                });
            };

            const nextStep = () => {
                if (currentStep < totalSteps - 1) {
                    setCurrentStep(currentStep + 1);
                    window.scrollTo(0, 0);
                } else {
                    // 診断完了
                    setShowResult(true);
                    window.scrollTo(0, 0);
                }
            };

            const prevStep = () => {
                if (currentStep > 0) {
                    setCurrentStep(currentStep - 1);
                    window.scrollTo(0, 0);
                }
            };

            // 診断結果の判定ロジック
            const getDiagnosticResult = () => {
                let phase = '';
                let recommendations = [];

                // フェーズ判定
                if (formData.stage === 'アイデアを考え始めたところ' || 
                    formData.stage === 'ビジネスモデルを検討中' ||
                    formData.businessModelClear === 'アイデアはあるが具体化できていない') {
                    phase = 'アイデア検証・構想段階';
                    recommendations = [
                        'ビジネスモデルキャンバス作成セミナー',
                        '起業入門セミナー',
                        '先輩起業家との交流会',
                        'アイデアブラッシュアップ個別相談'
                    ];
                } else if (formData.stage === '事業計画を作成中' ||
                        formData.businessPlanStatus === '作成中' ||
                        formData.businessPlanStatus === 'これから作成予定') {
                    phase = '事業計画策定段階';
                    recommendations = [
                        '事業計画書作成セミナー',
                        '収支計画作成ワークショップ',
                        '事業計画書個別添削サービス',
                        '市場調査サポート'
                    ];
                } else if (formData.stage === '資金調達を準備中' ||
                        (formData.externalFunding && formData.externalFunding.length > 0)) {
                    phase = '資金調達準備段階';
                    recommendations = [
                        '創業融資セミナー（日本政策金融公庫）',
                        '補助金・助成金活用セミナー',
                        '融資申込書作成サポート',
                        '金融機関との面談同行サービス',
                        '資金調達専門家とのマッチング'
                    ];
                } else if (formData.stage === '開業準備中（登記・許認可など）') {
                    phase = '開業準備・手続き段階';
                    recommendations = [
                        '創業手続き完全ガイドセミナー',
                        '許認可申請サポート',
                        '司法書士・行政書士とのマッチング',
                        '税理士とのマッチング',
                        '開業前チェックリスト配布'
                    ];
                } else if (formData.stage === 'すでに開業済み') {
                    phase = '開業直後・販路開拓段階';
                    recommendations = [
                        'Webマーケティングセミナー',
                        'SNS活用セミナー',
                        'ビジネスマッチング会',
                        '販路開拓支援',
                        '経営相談（月次）'
                    ];
                }

                // 業種別の追加推奨
                if (formData.industryCategory === 'IT・デジタル関連') {
                    recommendations.push('IT導入補助金セミナー', 'DX推進個別相談');
                } else if (formData.industryCategory === '製造・ものづくり') {
                    recommendations.push('ものづくり補助金セミナー', '工場見学・技術交流会');
                } else if (formData.industryCategory === '農林水産業') {
                    recommendations.push('農業次世代人材投資資金の案内', '6次産業化支援');
                }

                return { phase, recommendations };
            };

            const renderStepContent = () => {
                const step = steps[currentStep];

                const RadioOption = ({ name, value, checked, onChange, label }) => (
                    <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                        <input
                            type="radio"
                            name={name}
                            value={value}
                            checked={checked}
                            onChange={onChange}
                            className="w-5 h-5 text-blue-600"
                        />
                        <span className="ml-3 text-gray-700">{label}</span>
                    </label>
                );

                const CheckboxOption = ({ checked, onChange, label }) => (
                    <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={onChange}
                            className="w-5 h-5 text-blue-600"
                        />
                        <span className="ml-3 text-gray-700">{label}</span>
                    </label>
                );

                switch (step.id) {
                    case 'stage':
                        return (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-gray-800">現在の状況を教えてください</h2>
                                <div className="space-y-3">
                                    {[
                                        'アイデアを考え始めたところ',
                                        'ビジネスモデルを検討中',
                                        '事業計画を作成中',
                                        '資金調達を準備中',
                                        '開業準備中（登記・許認可など）',
                                        'すでに開業済み'
                                    ].map(option => (
                                        <RadioOption
                                            key={option}
                                            name="stage"
                                            value={option}
                                            checked={formData.stage === option}
                                            onChange={(e) => handleInputChange('stage', e.target.value)}
                                            label={option}
                                        />
                                    ))}
                                </div>
                            </div>
                        );

                    case 'businessType':
                        return (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-gray-800">事業形態はどうする予定ですか？</h2>
                                <div className="space-y-3">
                                    {[
                                        '個人事業主',
                                        '株式会社',
                                        '合同会社',
                                        'その他の法人形態',
                                        'まだ決めていない'
                                    ].map(option => (
                                        <RadioOption
                                            key={option}
                                            name="businessType"
                                            value={option}
                                            checked={formData.businessType === option}
                                            onChange={(e) => handleInputChange('businessType', e.target.value)}
                                            label={option}
                                        />
                                    ))}
                                </div>
                            </div>
                        );

                    case 'corporationDetails':
                        return (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-800">法人形態について</h2>
                                
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">起業・経営の経験はありますか？</h3>
                                    <div className="space-y-3">
                                        {[
                                            '初めて',
                                            '過去に個人事業主として経験あり',
                                            '過去に法人経営の経験あり',
                                            '家族に経営者がいる',
                                            'スタートアップ・ベンチャーで働いた経験あり'
                                        ].map(option => (
                                            <RadioOption
                                                key={option}
                                                name="hasExperience"
                                                value={option}
                                                checked={formData.hasExperience === option}
                                                onChange={(e) => handleInputChange('hasExperience', e.target.value)}
                                                label={option}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">資本金の予定額は？</h3>
                                    <div className="space-y-3">
                                        {[
                                            '50万円未満',
                                            '50万円〜100万円',
                                            '100万円〜300万円',
                                            '300万円〜500万円',
                                            '500万円〜1,000万円',
                                            '1,000万円以上'
                                        ].map(option => (
                                            <RadioOption
                                                key={option}
                                                name="capitalAmount"
                                                value={option}
                                                checked={formData.capitalAmount === option}
                                                onChange={(e) => handleInputChange('capitalAmount', e.target.value)}
                                                label={option}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );

                    case 'industry':
                        return (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-800">業種を教えてください</h2>
                                
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">業種カテゴリ</h3>
                                    <div className="space-y-3">
                                        {Object.keys(industryCategories).map(category => (
                                            <RadioOption
                                                key={category}
                                                name="industryCategory"
                                                value={category}
                                                checked={formData.industryCategory === category}
                                                onChange={(e) => {
                                                    handleInputChange('industryCategory', e.target.value);
                                                    handleInputChange('industry', '');
                                                }}
                                                label={category}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {formData.industryCategory && (
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-700">詳細業種</h3>
                                        <div className="space-y-3">
                                            {industryCategories[formData.industryCategory].map(industry => (
                                                <RadioOption
                                                    key={industry}
                                                    name="industry"
                                                    value={industry}
                                                    checked={formData.industry === industry}
                                                    onChange={(e) => handleInputChange('industry', e.target.value)}
                                                    label={industry}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );

                    case 'industryDetails':
                        if (formData.industryCategory === 'IT・デジタル関連') {
                            return (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-gray-800">IT事業について</h2>
                                    
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-700">開発予定のサービスは？</h3>
                                        <div className="space-y-3">
                                            {['BtoB向け', 'BtoC向け', '両方'].map(option => (
                                                <RadioOption
                                                    key={option}
                                                    name="itTarget"
                                                    value={option}
                                                    checked={formData.itTarget === option}
                                                    onChange={(e) => handleInputChange('itTarget', e.target.value)}
                                                    label={option}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-700">技術スタックは決まっていますか？</h3>
                                        <div className="space-y-3">
                                            {['決まっている', '検討中', 'わからない・相談したい'].map(option => (
                                                <RadioOption
                                                    key={option}
                                                    name="techStack"
                                                    value={option}
                                                    checked={formData.techStack === option}
                                                    onChange={(e) => handleInputChange('techStack', e.target.value)}
                                                    label={option}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        } else if (formData.industryCategory === '飲食') {
                            return (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-gray-800">飲食事業について</h2>
                                    
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-700">店舗は？</h3>
                                        <div className="space-y-3">
                                            {[
                                                'テナント契約済み',
                                                '物件探し中',
                                                '自宅開業',
                                                '店舗不要（キッチンカー・デリバリー専門など）'
                                            ].map(option => (
                                                <RadioOption
                                                    key={option}
                                                    name="restaurantLocation"
                                                    value={option}
                                                    checked={formData.restaurantLocation === option}
                                                    onChange={(e) => handleInputChange('restaurantLocation', e.target.value)}
                                                    label={option}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-700">飲食店営業許可の取得状況は？</h3>
                                        <div className="space-y-3">
                                            {['取得済み', '申請準備中', 'これから調べる', 'わからない'].map(option => (
                                                <RadioOption
                                                    key={option}
                                                    name="restaurantPermit"
                                                    value={option}
                                                    checked={formData.restaurantPermit === option}
                                                    onChange={(e) => handleInputChange('restaurantPermit', e.target.value)}
                                                    label={option}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        } else if (formData.industryCategory === '教育・人材') {
                            return (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-gray-800">教育事業について</h2>
                                    
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-700">対象年齢層は？（複数選択可）</h3>
                                        <div className="space-y-3">
                                            {[
                                                '未就学児',
                                                '小学生',
                                                '中学生',
                                                '高校生',
                                                '大学生・社会人',
                                                '企業向け'
                                            ].map(option => (
                                                <CheckboxOption
                                                    key={option}
                                                    checked={(formData.educationTarget || []).includes(option)}
                                                    onChange={() => handleMultiSelect('educationTarget', option)}
                                                    label={option}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-700">指導形態は？</h3>
                                        <div className="space-y-3">
                                            {[
                                                '対面のみ',
                                                'オンラインのみ',
                                                'ハイブリッド（対面+オンライン）'
                                            ].map(option => (
                                                <RadioOption
                                                    key={option}
                                                    name="educationFormat"
                                                    value={option}
                                                    checked={formData.educationFormat === option}
                                                    onChange={(e) => handleInputChange('educationFormat', e.target.value)}
                                                    label={option}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        return null;

                    case 'businessModel':
                        return (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-800">事業内容について</h2>
                                
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">ビジネスモデルは明確ですか？</h3>
                                    <div className="space-y-3">
                                        {[
                                            '明確に定まっている（誰に何をどう売るか決まっている）',
                                            'おおよそ決まっている',
                                            'アイデアはあるが具体化できていない',
                                            'これから考える'
                                        ].map(option => (
                                            <RadioOption
                                                key={option}
                                                name="businessModelClear"
                                                value={option}
                                                checked={formData.businessModelClear === option}
                                                onChange={(e) => handleInputChange('businessModelClear', e.target.value)}
                                                label={option}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">ターゲット顧客は明確ですか？</h3>
                                    <div className="space-y-3">
                                        {[
                                            '明確（ペルソナまで設定済み）',
                                            'ある程度明確',
                                            '漠然としている',
                                            'これから考える'
                                        ].map(option => (
                                            <RadioOption
                                                key={option}
                                                name="targetCustomerClear"
                                                value={option}
                                                checked={formData.targetCustomerClear === option}
                                                onChange={(e) => handleInputChange('targetCustomerClear', e.target.value)}
                                                label={option}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">競合分析は実施しましたか？</h3>
                                    <div className="space-y-3">
                                        {[
                                            '詳細に分析済み',
                                            '簡単に調べた',
                                            'これから調べる',
                                            '競合はいない（と思う）'
                                        ].map(option => (
                                            <RadioOption
                                                key={option}
                                                name="competitorAnalysis"
                                                value={option}
                                                checked={formData.competitorAnalysis === option}
                                                onChange={(e) => handleInputChange('competitorAnalysis', e.target.value)}
                                                label={option}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );

                    case 'funding':
                        return (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-800">資金計画について</h2>
                                
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">初期投資額の見積もりは？</h3>
                                    <div className="space-y-3">
                                        {[
                                            '具体的な金額を算出済み',
                                            '概算は出している',
                                            'まだ全く見積もっていない',
                                            '見積もり方がわからない'
                                        ].map(option => (
                                            <RadioOption
                                                key={option}
                                                name="initialInvestmentEstimated"
                                                value={option}
                                                checked={formData.initialInvestmentEstimated === option}
                                                onChange={(e) => handleInputChange('initialInvestmentEstimated', e.target.value)}
                                                label={option}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {formData.initialInvestmentEstimated === '具体的な金額を算出済み' && (
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-700">初期投資額の規模は？</h3>
                                        <div className="space-y-3">
                                            {[
                                                '100万円未満',
                                                '100万円〜300万円',
                                                '300万円〜500万円',
                                                '500万円〜1,000万円',
                                                '1,000万円以上'
                                            ].map(option => (
                                                <RadioOption
                                                    key={option}
                                                    name="initialInvestmentAmount"
                                                    value={option}
                                                    checked={formData.initialInvestmentAmount === option}
                                                    onChange={(e) => handleInputChange('initialInvestmentAmount', e.target.value)}
                                                    label={option}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">自己資金の割合は？</h3>
                                    <div className="space-y-3">
                                        {[
                                            '100%（全額自己資金）',
                                            '75%以上',
                                            '50%〜75%',
                                            '50%未満',
                                            '自己資金はほぼない'
                                        ].map(option => (
                                            <RadioOption
                                                key={option}
                                                name="selfFundingRatio"
                                                value={option}
                                                checked={formData.selfFundingRatio === option}
                                                onChange={(e) => handleInputChange('selfFundingRatio', e.target.value)}
                                                label={option}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );

                    case 'fundingDetails':
                        return (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-800">資金調達について</h2>
                                
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">外部からの資金調達を検討していますか？（複数選択可）</h3>
                                    <div className="space-y-3">
                                        {[
                                            '日本政策金融公庫からの融資',
                                            '銀行・信用金庫からの融資',
                                            '補助金・助成金（創業補助金、ものづくり補助金など）',
                                            'エンジェル投資家・VC',
                                            'クラウドファンディング',
                                            '親族・知人からの借入',
                                            '外部資金は不要',
                                            'まだ検討していない'
                                        ].map(option => (
                                            <CheckboxOption
                                                key={option}
                                                checked={(formData.externalFunding || []).includes(option)}
                                                onChange={() => handleMultiSelect('externalFunding', option)}
                                                label={option}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">資金調達に関する知識は？</h3>
                                    <div className="space-y-3">
                                        {[
                                            '十分ある（申請書類も自分で書ける）',
                                            'ある程度ある',
                                            'ほとんどない',
                                            '全くわからない'
                                        ].map(option => (
                                            <RadioOption
                                                key={option}
                                                name="fundingKnowledge"
                                                value={option}
                                                checked={formData.fundingKnowledge === option}
                                                onChange={(e) => handleInputChange('fundingKnowledge', e.target.value)}
                                                label={option}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );

                    case 'businessPlan':
                        return (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-800">事業計画書について</h2>
                                
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">事業計画書の作成状況は？</h3>
                                    <div className="space-y-3">
                                        {[
                                            '完成済み',
                                            '作成中',
                                            'これから作成予定',
                                            '作り方がわからない',
                                            '必要性を感じていない'
                                        ].map(option => (
                                            <RadioOption
                                                key={option}
                                                name="businessPlanStatus"
                                                value={option}
                                                checked={formData.businessPlanStatus === option}
                                                onChange={(e) => handleInputChange('businessPlanStatus', e.target.value)}
                                                label={option}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">収支計画（売上・経費予測）の作成状況は？</h3>
                                    <div className="space-y-3">
                                        {[
                                            '3年分以上作成済み',
                                            '1年分は作成済み',
                                            '作成中',
                                            'これから作成予定',
                                            '作り方がわからない'
                                        ].map(option => (
                                            <RadioOption
                                                key={option}
                                                name="financialPlanStatus"
                                                value={option}
                                                checked={formData.financialPlanStatus === option}
                                                onChange={(e) => handleInputChange('financialPlanStatus', e.target.value)}
                                                label={option}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">損益分岐点は把握していますか？</h3>
                                    <div className="space-y-3">
                                        {[
                                            '把握している',
                                            '概算は出している',
                                            'わからない',
                                            '損益分岐点とは何か知らない'
                                        ].map(option => (
                                            <RadioOption
                                                key={option}
                                                name="breakEvenKnown"
                                                value={option}
                                                checked={formData.breakEvenKnown === option}
                                                onChange={(e) => handleInputChange('breakEvenKnown', e.target.value)}
                                                label={option}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );

                    case 'procedures':
                        return (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-800">許認可・手続きについて</h2>
                                
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">事業に必要な許認可は把握していますか？</h3>
                                    <div className="space-y-3">
                                        {[
                                            '把握済みで、申請準備もできている',
                                            '把握済みだが、申請方法がわからない',
                                            '調査中',
                                            'わからない',
                                            '許認可は不要（と思う）'
                                        ].map(option => (
                                            <RadioOption
                                                key={option}
                                                name="permitKnown"
                                                value={option}
                                                checked={formData.permitKnown === option}
                                                onChange={(e) => handleInputChange('permitKnown', e.target.value)}
                                                label={option}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">創業手続き（登記・開業届など）の理解度は？</h3>
                                    <div className="space-y-3">
                                        {[
                                            '十分理解している',
                                            'ある程度理解している',
                                            'ほとんど知らない',
                                            '全くわからない'
                                        ].map(option => (
                                            <RadioOption
                                                key={option}
                                                name="procedureUnderstanding"
                                                value={option}
                                                checked={formData.procedureUnderstanding === option}
                                                onChange={(e) => handleInputChange('procedureUnderstanding', e.target.value)}
                                                label={option}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">税務・会計の準備は？</h3>
                                    <div className="space-y-3">
                                        {[
                                            '税理士・会計士と契約済み',
                                            '税理士・会計士を探している',
                                            '会計ソフトで自分で対応予定',
                                            'まだ何も考えていない'
                                        ].map(option => (
                                            <RadioOption
                                                key={option}
                                                name="accountingPreparation"
                                                value={option}
                                                checked={formData.accountingPreparation === option}
                                                onChange={(e) => handleInputChange('accountingPreparation', e.target.value)}
                                                label={option}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );

                    case 'marketing':
                        return (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-800">マーケティング・販路について</h2>
                                
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">販路・顧客獲得方法は？</h3>
                                    <div className="space-y-3">
                                        {[
                                            '既に確保済み（契約見込みあり）',
                                            '見込み客リストがある',
                                            'これから開拓する',
                                            '方法がわからない'
                                        ].map(option => (
                                            <RadioOption
                                                key={option}
                                                name="salesChannel"
                                                value={option}
                                                checked={formData.salesChannel === option}
                                                onChange={(e) => handleInputChange('salesChannel', e.target.value)}
                                                label={option}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">Webマーケティングの必要性をどう考えていますか？</h3>
                                    <div className="space-y-3">
                                        {[
                                            '必須と考えており、戦略も立てている',
                                            '必要だと思うが、やり方がわからない',
                                            'あった方が良いと思う',
                                            '不要だと思う'
                                        ].map(option => (
                                            <RadioOption
                                                key={option}
                                                name="webMarketingNeed"
                                                value={option}
                                                checked={formData.webMarketingNeed === option}
                                                onChange={(e) => handleInputChange('webMarketingNeed', e.target.value)}
                                                label={option}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );

                    case 'organization':
                        return (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-800">人材・組織について</h2>
                                
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">共同創業者・パートナーはいますか？</h3>
                                    <div className="space-y-3">
                                        {[
                                            'いる',
                                            '探している',
                                            '一人で始める予定'
                                        ].map(option => (
                                            <RadioOption
                                                key={option}
                                                name="cofounder"
                                                value={option}
                                                checked={formData.cofounder === option}
                                                onChange={(e) => handleInputChange('cofounder', e.target.value)}
                                                label={option}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">従業員の雇用予定は？</h3>
                                    <div className="space-y-3">
                                        {[
                                            '開業時から雇用予定',
                                            '軌道に乗ってから雇用予定',
                                            '当面は一人で運営',
                                            '未定'
                                        ].map(option => (
                                            <RadioOption
                                                key={option}
                                                name="employmentPlan"
                                                value={option}
                                                checked={formData.employmentPlan === option}
                                                onChange={(e) => handleInputChange('employmentPlan', e.target.value)}
                                                label={option}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );

                    case 'risk':
                        return (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-800">リスク管理について</h2>
                                
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">事業リスクの洗い出しは？</h3>
                                    <div className="space-y-3">
                                        {[
                                            '実施済みで対策も検討している',
                                            'リスクは認識しているが対策は未定',
                                            'これから洗い出す',
                                            '考えていない'
                                        ].map(option => (
                                            <RadioOption
                                                key={option}
                                                name="riskAssessment"
                                                value={option}
                                                checked={formData.riskAssessment === option}
                                                onChange={(e) => handleInputChange('riskAssessment', e.target.value)}
                                                label={option}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">事業開始予定時期は？</h3>
                                    <div className="space-y-3">
                                        {[
                                            '1ヶ月以内',
                                            '3ヶ月以内',
                                            '半年以内',
                                            '1年以内',
                                            '1年以上先',
                                            '未定'
                                        ].map(option => (
                                            <RadioOption
                                                key={option}
                                                name="startTiming"
                                                value={option}
                                                checked={formData.startTiming === option}
                                                onChange={(e) => handleInputChange('startTiming', e.target.value)}
                                                label={option}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );

                    case 'support':
                        return (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-800">支援ニーズについて</h2>
                                
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">今、最も困っていることは？（複数選択可）</h3>
                                    <div className="space-y-3">
                                        {[
                                            'アイデアの具体化・ビジネスモデルの構築',
                                            '事業計画書の作成',
                                            '資金調達の方法',
                                            '許認可・手続きの進め方',
                                            '顧客・販路の開拓',
                                            'マーケティング・集客',
                                            '会計・税務',
                                            '人材採用・労務管理',
                                            'Webサイト・システム構築',
                                            'メンタリング・相談相手が欲しい',
                                            'その他'
                                        ].map(option => (
                                            <CheckboxOption
                                                key={option}
                                                checked={(formData.biggestChallenge || []).includes(option)}
                                                onChange={() => handleMultiSelect('biggestChallenge', option)}
                                                label={option}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">CLIP長岡に期待する支援内容は？（複数選択可）</h3>
                                    <div className="space-y-3">
                                        {[
                                            '個別相談（メンタリング）',
                                            'セミナー・勉強会',
                                            '専門家とのマッチング',
                                            '先輩起業家との交流',
                                            'コワーキングスペースの提供',
                                            '補助金・融資の情報提供',
                                            'ピッチイベントへの参加機会',
                                            'その他'
                                        ].map(option => (
                                            <CheckboxOption
                                                key={option}
                                                checked={(formData.supportNeeds || []).includes(option)}
                                                onChange={() => handleMultiSelect('supportNeeds', option)}
                                                label={option}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">相談したい専門家は？（複数選択可）</h3>
                                    <div className="space-y-3">
                                        {[
                                            '税理士',
                                            '社会保険労務士',
                                            '司法書士・行政書士',
                                            '弁護士',
                                            '中小企業診断士',
                                            'マーケティングコンサルタント',
                                            'Webデザイナー・エンジニア',
                                            '先輩起業家',
                                            'その他'
                                        ].map(option => (
                                            <CheckboxOption
                                                key={option}
                                                checked={(formData.expertNeeds || []).includes(option)}
                                                onChange={() => handleMultiSelect('expertNeeds', option)}
                                                label={option}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );

                    case 'contact':
                        return (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-800">連絡先（任意）</h2>
                                <p className="text-gray-600">診断結果の詳細やおすすめの支援情報をお送りします</p>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">お名前</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="w-full p-3 border-2 rounded-lg focus:border-blue-500 focus:outline-none"
                                            placeholder="山田 太郎"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">メールアドレス</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="w-full p-3 border-2 rounded-lg focus:border-blue-500 focus:outline-none"
                                            placeholder="example@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">電話番号</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            className="w-full p-3 border-2 rounded-lg focus:border-blue-500 focus:outline-none"
                                            placeholder="090-1234-5678"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">その他、気になることや相談したいこと</label>
                                        <textarea
                                            value={formData.otherComments}
                                            onChange={(e) => handleInputChange('otherComments', e.target.value)}
                                            className="w-full p-3 border-2 rounded-lg focus:border-blue-500 focus:outline-none"
                                            rows="4"
                                            placeholder="自由にご記入ください"
                                        />
                                    </div>
                                </div>
                            </div>
                        );

                    default:
                        return null;
                }
            };

            const renderResult = () => {
                const { phase, recommendations } = getDiagnosticResult();

                return (
                    <div className="space-y-8">
                        <div className="text-center">
                            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">診断完了！</h2>
                            <p className="text-gray-600">あなたの起業準備の現在地が分かりました</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-xl shadow-lg">
                            <h3 className="text-2xl font-bold mb-2">あなたの現在のフェーズ</h3>
                            <p className="text-3xl font-bold">{phase}</p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">おすすめの支援内容</h3>
                            <ul className="space-y-3">
                                {recommendations.map((rec, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700">{rec}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-xl">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">次のステップ</h3>
                            <p className="text-gray-700 mb-4">
                                CLIP長岡では、あなたの起業準備をサポートするための様々なプログラムをご用意しています。
                                お気軽にご相談ください。
                            </p>
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                CLIP長岡に相談する
                            </button>
                        </div>

                        {formData.email && (
                            <div className="text-center text-gray-600">
                                <p>診断結果を {formData.email} に送信しました（※実装時に実際に送信されます）</p>
                            </div>
                        )}
                    </div>
                );
            };

            if (showResult) {
                return (
                    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
                        <div className="max-w-3xl mx-auto">
                            {renderResult()}
                        </div>
                    </div>
                );
            }

            return (
                <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
                    <div className="max-w-3xl mx-auto">
                        {/* ヘッダー */}
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">起業ロードマップ診断</h1>
                            <p className="text-gray-600">あなたの起業準備、どこまで進んでいますか？</p>
                        </div>

                        {/* 進捗バー */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-semibold text-gray-600">
                                    ステップ {currentStep + 1} / {totalSteps}
                                </span>
                                <span className="text-sm font-semibold text-gray-600">{Math.round(progress)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="text-sm text-gray-600 mt-2">{steps[currentStep].title}</p>
                        </div>

                        {/* 質問コンテンツ */}
                        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
                            {renderStepContent()}
                        </div>

                        {/* ナビゲーションボタン */}
                        <div className="flex justify-between">
                            <button
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                                    currentStep === 0
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-gray-600 text-white hover:bg-gray-700'
                                }`}
                            >
                                <ChevronLeft />
                                <span className="ml-2">戻る</span>
                            </button>

                            <button
                                onClick={nextStep}
                                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-colors"
                            >
                                <span className="mr-2">{currentStep === totalSteps - 1 ? '診断結果を見る' : '次へ'}</span>
                                <ChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        // アプリをレンダリング
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<StartupDiagnostic />);
