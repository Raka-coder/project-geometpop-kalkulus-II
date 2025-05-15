import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

const feedbackFormSchema = z.object({
  name: z.string().optional(),
  email: z.string().email('Email tidak valid').optional().or(z.literal('')),
  feedbackType: z.enum(['bug', 'suggestion', 'feature', 'general'], {
    required_error: 'Harap pilih jenis feedback',
  }),
  message: z.string().min(10, {
    message: 'Pesan harus minimal 10 karakter',
  }),
});

type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;

function HelpFeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(data: FeedbackFormValues) {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await axios.post(
        import.meta.env.VITE_GETFORM_ENDPOINT,
        {
          name: data.name || 'Anonymous',
          email: data.email || 'No email provided',
          feedback_type: data.feedbackType,
          message: data.message,
          submitted_at: new Date().toISOString(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      setSubmitSuccess(true);
      form.reset();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitError(
        'Terjadi kesalahan saat mengirim feedback. Silakan coba lagi.'
      );

      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
        });
        setSubmitError(
          `Error: ${error.response?.data?.message || error.message}`
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitSuccess) {
    return (
      <Card className="p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Terima Kasih!</h2>
        <p className="text-green-600 mb-4">
          Feedback Anda telah berhasil dikirim ke tim developer.
        </p>
        <Button onClick={() => setSubmitSuccess(false)} className="mt-4">
          Kirim Feedback Lagi
        </Button>
        <Button
          variant="ghost"
          onClick={() => window.location.reload()}
          className="mt-4 ml-2"
        >
          Kembali
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 mx-auto">
      <CardTitle className="text-2xl text-dark-blue font-semibold mb-6">Kirim Feedback ke Developer</CardTitle>
      <p className="mb-6 text-gray-700">
        Kami sangat menghargai masukan Anda untuk membantu kami meningkatkan
        website ini.
      </p>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        method="post"
      >
        {submitSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            Feedback Anda telah berhasil dikirim!
          </div>
        )}
        {submitError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {submitError}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Nama Anda (Opsional)
            </label>
            <Input
              id="name"
              placeholder="Nama Anda"
              {...form.register('name')}
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email (Opsional)
            </label>
            <Input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              {...form.register('email')}
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="feedbackType"
            className="block text-sm font-medium mb-1"
          >
            Jenis Feedback*
          </label>
          <Select
            onValueChange={(value) =>
              form.setValue(
                'feedbackType',
                value as 'bug' | 'suggestion' | 'feature' | 'general'
              )
            }
            defaultValue={form.watch('feedbackType')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih Jenis Feedback" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bug">Laporan Bug/Error</SelectItem>
              <SelectItem value="suggestion">Saran Perbaikan</SelectItem>
              <SelectItem value="feature">Permintaan Fitur Baru</SelectItem>
              <SelectItem value="general">Feedback Umum</SelectItem>
            </SelectContent>
          </Select>
          {form.formState.errors.feedbackType && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.feedbackType.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Pesan Anda*
          </label>
          <Textarea
            id="message"
            placeholder="Jelaskan feedback Anda secara detail..."
            className="min-h-[150px]"
            {...form.register('message')}
          />
          {form.formState.errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.message.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto bg-custom-yellow text-dark-blue hover:bg-custom-yellow/90 font-medium"
          variant="default"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Mengirim...
            </>
          ) : (
            'Kirim Feedback'
          )}
        </Button>
      </form>
    </Card>
  );
}

export default HelpFeedbackForm;
