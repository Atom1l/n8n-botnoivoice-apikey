import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      voicemarketplace: "Voice Marketplace",
      api: "API",
      pricing: "Pricing",
      sale: "SALE",
      enterprisepricing: "Enterprise Pricing",
      voicebot: "VOICE BOT",
      signup: "Sign Up",
      logout: "Log out",

      welcome: "WELCOME TO BOTNOI VOICE N8N",
      convert: "Convert Text to Speech<br> with N8N",
      description: "Easily generate realistic voices for every step in your automation process with our n8n node. Choose from over <strong>300 voices</strong> and <strong>10+ languages</strong>. Perfect for voiceovers, ads, educational content, podcasts, articles, lifestyle media, or audiobooks. Easy to use, and generate lifelike voices anytime, anywhere.",
      tryfree: "Try for Free",
      loginheader: "Login",
      login: "Login with Google",
      loginfailed: "Login failed. Please try again.",
      terms1: "By continuing, you accept our",
      terms2: "Terms of Service",
      and: "and",
      privacy: "Privacy Policy",
      
      privacypolicy: "Privacy & Policy",
      menu: "Menu",
      tool: "Tools",
      package: "Buy Package",
      points: "Buy Points",
      documentation: "Documentation",
      reportissue: "Report Issue",
      endtts: "Englisth Text to Speech",
      thtts: "Thai Text to Speech",
      chtts: "Chinese Text to Speech",
      jptts: "Japanese Text to Speech",
      vntts: "Vietnamese Text to Speech",
      idntts: "Indonesian Text to Speech",

      yourapikey: "Your API Keys",
      apikeydescription: "You can use the API Keys to generate voices as needed at",
      apidocs: "API Documentation",
      copied: "Copied!",
    }
  },
  th: {
    translation: {
      voicemarketplace: "เสียงพากย์",
      api: "API",
      pricing: "ราคา",
      sale: "SALE",
      enterprisepricing: "ราคาองค์กร",
      voicebot: "VOICE BOT",
      signup: "ลงทะเบียน",
      logout: "ออกจากระบบ",

      welcome: "ยินดีต้อนรับสู่ BOTNOI VOICE N8N",
      convert: "แปลงข้อความเป็นเสียง<br>ด้วย N8N",
      description: "สร้างเสียงที่สมจริงสำหรับทุกขั้นตอนในกระบวนการอัตโนมัติของคุณด้วย n8n node ของเรา เลือกได้ <strong>300 เสียง</strong> และ <strong>10+ ภาษา</strong> เหมาะสำหรับการทำเสียงพากย์ โฆษณา เนื้อหาการศึกษา พอดแคสต์ บทความ สื่อไลฟ์สไตล์ หรือหนังสือเสียง ใช้งานง่าย สร้างสรรค์เสียงที่สมจริงได้ทุกที่ทุกเวลา",
      tryfree: "ทดลองใช้ฟรี",
      loginheader: "เข้าสู่ระบบ",
      login: "เข้าสู่ระบบด้วย Google",
      loginfailed: "การเข้าสู่ระบบล้มเหลว กรุณาลองอีกครั้ง",
      terms1: "โดยการดำเนินการต่อ คุณยอมรับ",
      terms2: "ข้อกำหนดในการให้บริการ",
      and: "และ",
      privacy: "นโยบายความเป็นส่วนตัว",

      privacypolicy: "นโยบายความเป็นส่วนตัว",
      menu: "เมนู",
      tool: "เครื่องมือ",
      package: "ซื้อแพ็กเกจ",
      points: "ซื้อพอยท์",
      documentation: "เอกสาร",
      reportissue: "รายงานปัญหา",
      endtts: "แปลงข้อความเป็นเสียงภาษาอังกฤษ",
      thtts: "แปลงข้อความเป็นเสียงภาษาไทย",
      chtts: "แปลงข้อความเป็นเสียงภาษาจีน",
      jptts: "แปลงข้อความเป็นเสียงภาษาญี่ปุ่น",
      vntts: "แปลงข้อความเป็นเสียงภาษาเวียดนาม",
      idntts: "แปลงข้อความเป็นเสียงภาษาอินโดนีเซีย",

      yourapikey: "คีย์ API ของคุณ",
      apikeydescription: "คุณสามารถใช้คีย์ API เพื่อสร้างเสียงตามต้องการที่",
      apidocs: "คู่มือการใช้งาน",
      copied: "คัดลอกแล้ว!",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'th', // เริ่มต้นภาษา
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
