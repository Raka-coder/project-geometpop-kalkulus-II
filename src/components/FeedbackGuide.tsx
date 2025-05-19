import { CheckCircle } from "lucide-react"
import { Card, CardTitle } from "@/components/ui/card"

function FeedbackGuide() {
  return (
    <Card className="p-6 mt-8">
      <CardTitle className="text-2xl text-dark-blue font-semibold mb-6">Panduan Memberikan Feedback</CardTitle>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium">Jelaskan dengan Spesifik</h4>
            <p className="text-gray-600">
              Untuk bug, sertakan langkah-langkah atau alurnya dengan jelas. Untuk fitur baru, jelaskan manfaat dan use case-nya.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium">Sertakan Konteks</h4>
            <p className="text-gray-600">
              Jelaskan situasi atau masalah yang ingin Anda selesaikan dengan feedback ini.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium">Gunakan Bahasa yang Sopan</h4>
            <p className="text-gray-600">
              Semua feedback akan dibaca oleh tim. Kami menghargai bahasa yang sopan dan konstruktif.
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default FeedbackGuide