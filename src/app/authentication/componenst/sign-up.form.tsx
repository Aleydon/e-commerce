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

export function SignUpForm() {
  const router = useRouter();
  const formSchema = z
    .object({
      name: z
        .string()
        .trim()
        .min(2, { message: 'Nome deve ter no mínimo 2 caracteres.' })
        .max(50, { message: 'Nome deve ter no máximo 50 caracteres.' }),
      email: z.email('E-mail inválido!').min(2).max(50),
      password: z
        .string()
        .min(6, { message: 'Senha deve ter no mínimo 6 caracteres.' })
        .max(50, { message: 'Senha deve ter no máximo 50 caracteres.' }),
      passwordConfirmation: z
        .string()
        .min(6, {
          message: 'Confirmação de senha deve ter no mínimo 6 caracteres.'
        })
        .max(50, {
          message: 'Confirmação de senha deve ter no máximo 50 caracteres.'
        })
    })
    .refine(
      data => {
        return data.password === data.passwordConfirmation;
      },
      {
        error: 'As senhas devem ser iguais.',
        path: ['passwordConfirmation']
      }
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
        },
        onError: error => {
          if (error) {
            toast.error('E-mail já cadastrado!');
            form.setError('email', {
              type: 'manual',
              message: 'E-mail já cadastrado!'
            });
          }
          toast.error(error.error.message || 'Erro ao criar conta.');
        }
      }
    });
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
          <CardDescription>Crie uma conta para continuar.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Digite seu nome"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Digite a sua senha novamente"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">Criar conta</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}
