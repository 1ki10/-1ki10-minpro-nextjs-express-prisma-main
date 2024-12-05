import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Event } from '@/types/event';
import type { PurchaseTicketData } from '@/types/ticket';
import { formatCurrency } from "@/lib/utils/currency";
import { formatDate } from "@/lib/utils/date";

interface ConfirmPurchaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  purchaseData: PurchaseTicketData | null;
  event: Event;
}

export function ConfirmPurchaseDialog({
  isOpen,
  onClose,
  onConfirm,
  purchaseData,
  event,
}: ConfirmPurchaseDialogProps) {
  if (!purchaseData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Your Purchase</DialogTitle>
          <DialogDescription>
            Please review your ticket order details
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {/* Event Details */}
          <div>
            <h3 className="font-medium mb-2">Event Details</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Event:</strong> {event.title}</p>
              <p><strong>Date & Time:</strong> {formatDate(event.date, event.time)}</p>
              <p><strong>Location:</strong> {event.location}</p>
            </div>
          </div>

          {/* Order Details */}
          <div>
            <h3 className="font-medium mb-2">Order Details</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Tickets:</strong> {purchaseData.quantity}</p>
              <p><strong>Name:</strong> {purchaseData.buyerName}</p>
              <p><strong>Email:</strong> {purchaseData.buyerEmail}</p>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(event.price * purchaseData.quantity)}</span>
              </div>
              
              {purchaseData.discountApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({purchaseData.discountApplied.percentage}%)</span>
                  <span>-{formatCurrency(purchaseData.discountApplied.amountSaved)}</span>
                </div>
              )}
              
              <div className="flex justify-between font-bold pt-2 border-t">
                <span>Total</span>
                <span>{formatCurrency(purchaseData.totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            Confirm Purchase
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}