import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    // Konsep Dasar
    {
      question: "Apa itu pemodelan populasi?",
      answer:
        "Pemodelan populasi adalah metode matematika untuk memprediksi pertumbuhan atau penurunan jumlah individu dalam suatu populasi berdasarkan parameter tertentu seperti tingkat kelahiran, kematian, atau migrasi.",
    },
    {
      question: "Mengapa deret geometri digunakan dalam pemodelan populasi?",
      answer:
        "Deret geometri digunakan karena pola pertumbuhan populasi sering kali mengikuti rasio tetap (misalnya, pertumbuhan eksponensial), yang dapat direpresentasikan dengan rumus P(t) = P₀(1 + r)ᵗ.",
    },

    {
      question:
        "Apa saja contoh aplikasi pemodelan populasi dalam kehidupan sehari-hari?",
      answer:
        "Contohnya meliputi memproyeksikan pertumbuhan penduduk suatu negara, memprediksi jumlah hewan liar dalam suatu habitat, atau menentukan kebutuhan sumber daya seperti air, makanan, atau energi berdasarkan proyeksi populasi.",
    },

    {
      question:
        "Apakah saya bisa memasukkan nilai negatif untuk tingkat pertumbuhan (r)?",
      answer:
        "Ya, nilai negatif untuk r menunjukkan penurunan populasi (misalnya, jika terjadi penurunan kelahiran atau meningkatnya kematian).",
    },
    {
      question: "Apakah hasil pemodelan selalu akurat?",
      answer:
        "Tidak, hasil pemodelan hanya berupa estimasi berdasarkan asumsi bahwa tingkat pertumbuhan tetap konstan. Faktor-faktor lain seperti bencana alam, kebijakan baru, atau perubahan lingkungan dapat memengaruhi hasil aktual.",
    },

    // Bantuan Tambahan
    {
      question:
        "Di mana saya bisa mempelajari lebih lanjut tentang deret geometri?",
      answer:
        "Anda dapat mempelajari lebih lanjut tentang deret geometri melalui buku matematika, kursus online, atau artikel ilmiah tentang kalkulus dan matematika diskrit.",
    },
    {
      question: "Apakah ada manual book untuk website ini?",
      answer:
        "Ya, Anda dapat mengunduh manual book dengan mengklik tombol 'Unduh Manual Book' di halaman utama.",
    },
    {
      question: "Bagaimana cara melaporkan bug atau memberikan saran?",
      answer:
        "Silakan gunakan form feedback yang tersedia di halaman 'Bantuan'.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">FAQ</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
