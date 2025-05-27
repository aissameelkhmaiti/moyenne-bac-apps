import { useEffect, useState } from 'react';

function App() {
  const [regionale, setRegionale] = useState('');
  const [sem1, setSem1] = useState('');
  const [sem2, setSem2] = useState('');
  const [bac, setBac] = useState('');
  const [result, setResult] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState('fr'); // 'fr' ou 'ar'

  // Textes multilingues
  const texts = {
    fr: {
      title: "Calculateur de Moyenne Bac",
      region: "Note régionale",
      s1: "Note Semestre 1",
      s2: "Note Semestre 2",
      bac: "Note Bac National",
      calc: "Calculer la Moyenne Générale",
      result: "Moyenne Générale",
      dark: "Mode Sombre",
      light: "Mode Clair",
      switchLang: "العربية",
    },
    ar: {
      title: "حساب المعدل العام للباكالوريا",
      region: "النقطة الجهوية",
      s1: "نقطة الدورة الأولى",
      s2: "نقطة الدورة الثانية",
      bac: "نقطة الإمتحان الوطني",
      calc: "احسب المعدل العام",
      result: "المعدل العام",
      dark: "الوضع الليلي",
      light: "الوضع النهاري",
      switchLang: "Français",
    }
  };

  const t = texts[lang];

  // Appliquer le dark mode à la balise <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleCalculate = () => {
    const r = parseFloat(regionale);
    const s1 = parseFloat(sem1);
    const s2 = parseFloat(sem2);
    const b = parseFloat(bac);

    if (isNaN(r) || isNaN(s1) || isNaN(s2) || isNaN(b)) {
      alert(lang === 'fr' ? "Veuillez remplir toutes les notes." : "المرجو إدخال جميع النقاط.");
      return;
    }

    const moyenneSemestres = (s1 + s2) / 2;
    const moyenneGenerale = (r * 0.25) + (moyenneSemestres * 0.25) + (b * 0.5);
    setResult(moyenneGenerale.toFixed(2));
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
      <div className="bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Dark Mode & Langue */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm px-3 py-1 border rounded"
          >
            {darkMode ? t.light : t.dark}
          </button>
          <button
            onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
            className="text-sm px-3 py-1 border rounded"
          >
            {t.switchLang}
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
          {t.title}
        </h1>

        <div className="space-y-4">
          <input
            type="number"
            placeholder={t.region}
            value={regionale}
            onChange={(e) => setRegionale(e.target.value)}
            className="w-full p-2 border rounded text-black"
          />
          <input
            type="number"
            placeholder={t.s1}
            value={sem1}
            onChange={(e) => setSem1(e.target.value)}
            className="w-full p-2 border rounded text-black"
          />
          <input
            type="number"
            placeholder={t.s2}
            value={sem2}
            onChange={(e) => setSem2(e.target.value)}
            className="w-full p-2 border rounded text-black"
          />
          <input
            type="number"
            placeholder={t.bac}
            value={bac}
            onChange={(e) => setBac(e.target.value)}
            className="w-full p-2 border rounded text-black"
          />
          <button
            onClick={handleCalculate}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {t.calc}
          </button>
        </div>

        {result !== null && (
          <div className="mt-6 text-center text-lg font-semibold text-green-600 dark:text-green-400">
            {t.result} : {result} / 20
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
