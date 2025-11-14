/**
 * 起業ロードマップ診断 - Google Apps Script
 * 
 * このスクリプトをGoogle Apps Scriptエディタに貼り付けて、
 * ウェブアプリとして公開してください。
 */

// スプレッドシートのIDを設定（スプレッドシートのURLから取得）
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
// シート名
const SHEET_NAME = '診断結果';

/**
 * POSTリクエストを処理する関数
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // スプレッドシートを開く
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // シートが存在しない場合は作成
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // ヘッダー行を追加
      const headers = [
        'タイムスタンプ',
        '現在の状況',
        '事業形態',
        '起業経験',
        '業種カテゴリ',
        '詳細業種',
        'ビジネスモデルの明確さ',
        'ターゲット顧客の明確さ',
        '競合分析',
        '初期投資見積もり',
        '初期投資額',
        '資本金',
        '自己資金割合',
        '外部資金調達',
        '資金調達知識',
        '事業計画書作成状況',
        '収支計画作成状況',
        '損益分岐点把握',
        '許認可把握',
        '手続き理解度',
        '会計準備',
        '販路',
        'Webマーケティング',
        '共同創業者',
        '雇用予定',
        'リスク評価',
        '開始時期',
        '困っていること',
        '期待する支援',
        '相談したい専門家',
        '名前',
        'メール',
        '電話番号',
        'その他コメント',
        '診断フェーズ',
        '診断スコア',
        '推奨支援',
        '警告'
      ];
      sheet.appendRow(headers);
      
      // ヘッダー行を固定
      sheet.setFrozenRows(1);
      
      // ヘッダー行のスタイル設定
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
    }
    
    // データを整形
    const row = [
      data.timestamp || new Date().toISOString(),
      data.stage || '',
      data.businessType || '',
      data.hasExperience || '',
      data.industryCategory || '',
      data.industry || '',
      data.businessModelClear || '',
      data.targetCustomerClear || '',
      data.competitorAnalysis || '',
      data.initialInvestmentEstimated || '',
      data.initialInvestmentAmount || '',
      data.capitalAmount || '',
      data.selfFundingRatio || '',
      Array.isArray(data.externalFunding) ? data.externalFunding.join(', ') : '',
      data.fundingKnowledge || '',
      data.businessPlanStatus || '',
      data.financialPlanStatus || '',
      data.breakEvenKnown || '',
      data.permitKnown || '',
      data.procedureUnderstanding || '',
      data.accountingPreparation || '',
      data.salesChannel || '',
      data.webMarketingNeed || '',
      data.cofounder || '',
      data.employmentPlan || '',
      data.riskAssessment || '',
      data.startTiming || '',
      Array.isArray(data.biggestChallenge) ? data.biggestChallenge.join(', ') : '',
      Array.isArray(data.supportNeeds) ? data.supportNeeds.join(', ') : '',
      Array.isArray(data.expertNeeds) ? data.expertNeeds.join(', ') : '',
      data.name || '',
      data.email || '',
      data.phone || '',
      data.otherComments || '',
      data.diagnosticPhase || '',
      data.diagnosticScore || '',
      data.recommendations || '',
      data.warnings || ''
    ];
    
    // データを追加
    sheet.appendRow(row);
    
    // メール通知（オプション）
    if (data.email) {
      sendEmailNotification(data);
    }
    
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: 'データを保存しました' })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * メール通知を送信する関数（オプション）
 */
function sendEmailNotification(data) {
  try {
    const subject = '起業ロードマップ診断を受けていただきありがとうございます';
    const body = `
${data.name || 'お客様'} 様

この度は、CLIP長岡の起業ロードマップ診断をご利用いただき、誠にありがとうございます。

診断結果: ${data.diagnosticPhase || ''}

あなたに最適な支援プログラムをご用意しております。
詳細については、CLIP長岡までお気軽にお問い合わせください。

━━━━━━━━━━━━━━━━━━━━━━━━
一般社団法人新潟県起業支援センター CLIP長岡
〒940-0062 新潟県長岡市大手通2-2-6 ながおか市民センター3F
TEL: XXX-XXXX-XXXX
Email: info@example.com
Web: https://example.com
━━━━━━━━━━━━━━━━━━━━━━━━

このメールは自動送信されています。
    `;
    
    if (data.email) {
      GmailApp.sendEmail(data.email, subject, body);
    }
  } catch (error) {
    Logger.log('Email Error: ' + error.toString());
  }
}

/**
 * テスト用関数
 */
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        stage: 'アイデアを考え始めたところ',
        businessType: '株式会社',
        name: 'テスト 太郎',
        email: 'test@example.com'
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}
