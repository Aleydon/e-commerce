'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';

import { GoogleImage } from './google-image';

export function SignInForm() {
  const router = useRouter();

  const formSchema = z.object({
    email: z.email('E-mail inválido.').min(2).max(50),
    password: z
      .string()
      .min(6, { message: 'Senha deve ter no mínimo 6 caracteres.' })
      .max(50, { message: 'Senha deve ter no máximo 50 caracteres.' })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await authClient.signIn.email({
      email: values.email,
      password: values.password,
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
        },
        onError: error => {
          if (error.error.error === 'USER_NOT_FOUND') {
            toast.error(error.error.error);
            form.setError('email', {
              type: 'manual',
              message: error.error.error
            });
          } else {
            toast.error('Erro ao fazer login. Tente novamente.');
          }
        }
      }
    });
  }

  async function handleSIgnInWithGoogle() {
    await authClient.signIn.social({
      provider: 'google'
    });
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <CardDescription>Faça login para continuar.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Digite seu email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Digite sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full" type="submit">
                Entrar
              </Button>
              <Button
                className="w-full"
                onClick={handleSIgnInWithGoogle}
                type="button"
                variant="outline"
              >
                <GoogleImage />
                <p className="text-sm font-medium text-gray-600">
                  Entrar com Google
                </p>
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}
