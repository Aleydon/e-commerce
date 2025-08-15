'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { shippingAddressTable } from '@/db/schema';
import { useCreateShippingAddress } from '@/hooks/mutations/use-create-shipping-address';
import { useUpdateCartShippingAddress } from '@/hooks/mutations/use-update-cart-shipping-address';
import { useUserAddresses } from '@/hooks/queries/use-user-addresses';

interface AddressesProps {
  shippingAddresses: (typeof shippingAddressTable.$inferSelect)[];
  defaultShippingAddressId: string | null;
}

export function Addresses({
  shippingAddresses,
  defaultShippingAddressId
}: AddressesProps) {
  const router = useRouter();

  const [selectedAddress, setSelectedAddress] = useState<string | null>(
    defaultShippingAddressId || null
  );
  const createShippingAddressMutation = useCreateShippingAddress();
  const updateCartShippingAddressMutation = useUpdateCartShippingAddress();

  const { data: addresses, isLoading } = useUserAddresses({
    initialData: shippingAddresses
  });

  const addressFormSchema = z.object({
    recipientName: z.string().min(2, 'Nome completo inválido'),
    email: z.email('Email inválido'),
    cpfOrCnpj: z.string().min(11, 'CPF/CNPJ inválido'),
    phone: z.string().min(11, 'Celular inválido'),
    zipCode: z.string().min(8, 'CEP inválido'),
    address: z.string().min(3, 'Endereço inválido'),
    number: z.string().min(1, 'Número é obrigatório'),
    complement: z.string().optional(),
    neighborhood: z.string().min(2, 'Bairro é obrigatório'),
    city: z.string().min(2, 'Cidade é obrigatória'),
    state: z.string().length(2, 'Estado deve ter 2 caracteres')
  });

  type AddressFormValues = z.infer<typeof addressFormSchema>;

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      recipientName: '',
      email: '',
      cpfOrCnpj: '',
      phone: '',
      zipCode: '',
      address: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: ''
    }
  });
  async function onSubmit(values: AddressFormValues) {
    try {
      const newAddress =
        await createShippingAddressMutation.mutateAsync(values);
      toast.success('Endereço criado com sucesso!');
      form.reset();
      setSelectedAddress(newAddress.id);

      await updateCartShippingAddressMutation.mutateAsync({
        shippingAddressId: newAddress.id
      });
      toast.success('Endereço vinculado ao carrinho!');
    } catch (error) {
      toast.error('Erro ao criar endereço. Tente novamente.');
      console.error(error);
    }
  }

  async function handleGoToPayment() {
    if (!selectedAddress || selectedAddress === 'add_new') return;

    try {
      await updateCartShippingAddressMutation.mutateAsync({
        shippingAddressId: selectedAddress
      });
      toast.success('Endereço selecionado para entrega!');
      router.push('/cart/confirmation');
    } catch (error) {
      toast.error('Erro ao selecionar endereço. Tente novamente.');
      console.error(error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-4 text-center">
            <p>Carregando endereços...</p>
          </div>
        ) : (
          <RadioGroup
            value={selectedAddress}
            onValueChange={setSelectedAddress}
          >
            {addresses?.length === 0 && (
              <div className="py-4 text-center">
                <p className="text-muted-foreground">
                  Você ainda não possui endereços cadastrados.
                </p>
              </div>
            )}

            {addresses?.map(address => (
              <Card key={address.id}>
                <CardContent>
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value={address.id} id={address.id} />
                    <div className="flex-1">
                      <Label htmlFor={address.id} className="cursor-pointer">
                        <div>
                          <p className="text-sm">{address.street}</p>
                        </div>
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="add_new" id="add_new" />
                  <Label htmlFor="add_new">Adicionar novo endereço</Label>
                </div>
              </CardContent>
            </Card>
          </RadioGroup>
        )}

        {selectedAddress && selectedAddress !== 'add_new' && (
          <div className="mt-4">
            <Button
              onClick={handleGoToPayment}
              className="w-full"
              disabled={updateCartShippingAddressMutation.isPending}
            >
              {updateCartShippingAddressMutation.isPending
                ? 'Processando...'
                : 'Ir para pagamento'}
            </Button>
          </div>
        )}

        {selectedAddress === 'add_new' && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-4 space-y-4"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite seu email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="recipientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome completo</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite seu nome completo"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cpfOrCnpj"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <PatternFormat
                          format="###.###.###-##"
                          placeholder="000.000.000-00"
                          customInput={Input}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Celular</FormLabel>
                      <FormControl>
                        <PatternFormat
                          format="(##) #####-####"
                          placeholder="(11) 99999-9999"
                          customInput={Input}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CEP</FormLabel>
                      <FormControl>
                        <PatternFormat
                          format="#####-###"
                          placeholder="00000-000"
                          customInput={Input}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite seu endereço" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o número" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="complement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Complemento</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Apto, bloco, etc. (opcional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="neighborhood"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bairro</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o bairro" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite a cidade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o estado" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                onClick={() => onSubmit(form.getValues())}
                className="w-full"
                disabled={
                  createShippingAddressMutation.isPending ||
                  updateCartShippingAddressMutation.isPending
                }
              >
                {createShippingAddressMutation.isPending ||
                updateCartShippingAddressMutation.isPending
                  ? 'Salvando...'
                  : 'Salvar endereço'}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
