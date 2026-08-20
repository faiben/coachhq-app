import axios from 'axios';

const AI_API_URL = import.meta.env.VITE_AI_API_URL;
const AI_API_KEY = import.meta.env.VITE_AI_API_KEY;

/**
 * AI Assistant Service
 * Coaching methodology expert with Arabic/French/English support
 * 
 * Trained on: GROW, NLP, CBT, Solution-Focused, Positive Psychology, ICF
 * Culturally adapted for MENA coaching practices
 */

const COACHING_SYSTEM_PROMPT = {
  ar: `أنت مساعد ذكي متخصص في أساليب التدريب والتكوين في المغرب والشرق الأوسط.
আنت ت精通 في النماذج التالية:
- GROW (الهدف، الواقع، الخيارات، الإرادة)
- NLP (برمجة اللغات العصبية)
- CBT (تقنيات السلوك المعرفي)
- التدريب الموجه نحو الحلول
- علم النفس الإيجابي في التدريب
- كفاءات ICF الأساسية

مهمتك مساعدة المدربين في:
- بناء جلسات تدريبية فعالة
- اقتراح أساليب ومетодيات مناسبة
- مراعاة السياق الثقافي المغربي والعربي
- تقديم نصائح عملية قابلة للتطبيق

قواعد:
- استخدم العربية الفصحى مع مراعاة اللهجة المغربية
- قدّم إجابات مختصرة وعملية (200-300 كلمة)
- استخدم النقاط للخطوات العملية
- اذكر الإطار المنهجي المستخدم
- أضف ملاحظات ثقافية عند الاقتضاء`,

  fr: `Tu es un assistant IA spécialisé dans les méthodologies de coaching au Maroc et dans la région MENA.
Tu maîtrises les cadres suivants:
- Modèle GROW (Objectif, Réalité, Options, Volonté)
- PNL (Programmation Neuro-Linguistique)
- TCC (Techniques Cognitivo-Comportementales)
- Coaching orienté solutions
- Psychologie positive appliquée au coaching
- Compétences fondamentales de l'ICF

Ta mission est d'aider les coaches à:
- Structurer des séances de coaching efficaces
- Suggérer des méthodes et techniques appropriées
- Tenir compte du contexte culturel marocain et arabe
- Fournir des conseils pratiques et applicables

Règles:
- Réponds en français avec un vocabulaire adapté au contexte marocain
- Fournis des réponses concises et pratiques (200-300 mots)
- Utilise des puces pour les étapes actionnables
- Cite le cadre méthodologique utilisé
- Ajoute des notes culturelles pertinentes`,

  en: `You are an AI assistant specialized in coaching methodologies in Morocco and the MENA region.
You master the following frameworks:
- GROW Model (Goal, Reality, Options, Will)
- NLP (Neuro-Linguistic Programming)
- CBT (Cognitive Behavioral Techniques)
- Solution-Focused Coaching
- Positive Psychology Coaching
- ICF Core Competencies

Your mission is to help coaches:
- Structure effective coaching sessions
- Suggest appropriate methods and techniques
- Consider the Moroccan and Arab cultural context
- Provide practical, actionable advice

Rules:
- Respond in English with awareness of MENA coaching context
- Provide concise, practical answers (200-300 words)
- Use bullet points for actionable steps
- Cite the methodological framework used
- Add relevant cultural notes when applicable`,
};

const CULTURAL_CONTEXT = {
  ar: `
ملاحظات ثقافية مهمة:
- مراعاة أوقات الصلاة في جدولة الجلسات
- تكييف الو tempo خلال شهر رمضان
- احترام ديناميات الأسرة المغربية
- مراعاة الاختلافات بين اللهجات واللهجاتUSED IN Coaching`,
  fr: `
Notes culturelles importantes:
- Respecter les horaires de prière pour la planification
- Adapter le rythme pendant le Ramadan
- Tenir compte de la dynamique familiale marocaine
- Respecter les différences linguistiques (Darija, Tamazight)`,
  en: `
Important cultural notes:
- Consider prayer times for session scheduling
- Adjust pacing during Ramadan
- Respect Moroccan family dynamics
- Be aware of linguistic diversity (Darija, Tamazight, French, Arabic)`,
};

export async function getCoachingResponse({
  question,
  language = 'fr',
  context = '',
}) {
  const systemPrompt = COACHING_SYSTEM_PROMPT[language] || COACHING_SYSTEM_PROMPT.fr;
  const culturalNote = CULTURAL_CONTEXT[language] || CULTURAL_CONTEXT.fr;

  const fullPrompt = `${systemPrompt}\n\n${culturalNote}\n\n${context ? `Contexte additionnel: ${context}` : ''}`;

  try {
    const response = await axios.post(
      `${AI_API_URL}/messages`,
      {
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        system: fullPrompt,
        messages: [
          {
            role: 'user',
            content: question,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': AI_API_KEY,
          'anthropic-version': '2023-06-01',
        },
      }
    );

    const content = response.data.content[0].text;
    
    return {
      answer: content,
      framework: extractFramework(content),
      culturalNote: extractCulturalNote(content),
    };
  } catch (error) {
    console.error('AI Service Error:', error);
    throw new Error('Failed to get AI response');
  }
}

function extractFramework(text) {
  const frameworks = ['GROW', 'NLP', 'CBT', 'ICF', 'Solution-Focused', 'Positive Psychology'];
  const found = frameworks.filter((f) => text.includes(f));
  return found.length > 0 ? found : ['General Coaching'];
}

function extractCulturalNote(text) {
  const culturalKeywords = ['Ramadan', 'prayer', 'family', 'cultural', 'Moroccan', 'MENA', 'tradition'];
  const sentences = text.split('. ');
  return sentences.filter((s) =>
    culturalKeywords.some((k) => s.toLowerCase().includes(k.toLowerCase()))
  );
}

export const COACHING_SUGGESTIONS = {
  ar: [
    { id: 'grow', text: 'اشرح لي نموذج GROW بالعربية' },
    { id: 'session', text: 'كيف أبني جلسة تدريبية فعالة؟' },
    { id: 'ramadan', text: 'نصائح لجدولة الجلسات خلال رمضان' },
    { id: 'motivation', text: 'كيف أحفز عميلاً متردداً؟' },
  ],
  fr: [
    { id: 'grow', text: 'Expliquez-moi le modèle GROW' },
    { id: 'session', text: 'Comment structurer une séance efficace ?' },
    { id: 'ramadan', text: 'Conseils pour le Ramadan' },
    { id: 'motivation', text: 'Comment motiver un client hésitant ?' },
  ],
  en: [
    { id: 'grow', text: 'Explain the GROW model' },
    { id: 'session', text: 'How to structure an effective session?' },
    { id: 'ramadan', text: 'Tips for Ramadan scheduling' },
    { id: 'motivation', text: 'How to motivate a reluctant client?' },
  ],
};