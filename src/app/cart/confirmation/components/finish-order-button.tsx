'use client';

import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle
} from '@/components/ui/dialog';
import { useFinishOrder } from '@/hooks/mutations/use-finish-order';

export function FinishOrderButton() {
  const [sucessDialogIsOpen, setSucessDialogIsOpen] = useState(true);

  const finishOrderMutation = useFinishOrder();

  return (
    <>
      <Button
        className="w-full rounded-full"
        size={'lg'}
        onClick={() => finishOrderMutation.mutate()}
        disabled={finishOrderMutation.isPending}
      >
        {finishOrderMutation.isPending && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        Finalizar Pedido
      </Button>

      <Dialog open={sucessDialogIsOpen} onOpenChange={setSucessDialogIsOpen}>
        <DialogContent>
          <Image
            className="mx-auto"
            src="/order-confirmation.svg"
            alt="Pedido finalizado com sucesso"
            width={300}
            height={300}
          />
          <DialogTitle className="mt-6 text-center text-2xl">
            Pedido Efetuado!
          </DialogTitle>
          <DialogDescription className="font-medium">
            Seu pedido foi efetuado com sucesso. Você pode acompanhar o status
            na seção de “Meus Pedidos”.
          </DialogDescription>
          <DialogFooter>
            <Button
              className="bg- rounded-full"
              variant={'outline'}
              size={'lg'}
            >
              Página inicial
            </Button>
            <Button className="rounded-full" variant={'default'} size={'lg'}>
              Ver meus pedidos
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
