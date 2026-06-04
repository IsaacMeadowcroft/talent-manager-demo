import { ThumbsUp } from "lucide-react";

type BrandOfferModalProps = {
  offerCreated: boolean;
  onClose: () => void;
  onCreateOffer: () => void;
  onDone: () => void;
};

export function BrandOfferModal({
  offerCreated,
  onClose,
  onCreateOffer,
  onDone,
}: BrandOfferModalProps) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-card rounded-lg border border-border p-6 w-full max-w-md"
      >
        {offerCreated ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-[#10b981]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ThumbsUp className="w-8 h-8 text-[#10b981]" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Brand Offer Added</h4>
            <p className="text-sm text-muted-foreground mb-4">
              The offer is now in your Deal Desk and ready for AI review.
            </p>
            <button
              onClick={onDone}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-semibold mb-4">Add Brand Offer</h3>
            <div className="space-y-3 mb-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">
                  Brand / Campaign
                </label>
                <input
                  type="text"
                  placeholder="Alo Moves / Summer Studio Drop"
                  className="w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">
                  Initial Offer
                </label>
                <input
                  type="text"
                  placeholder="$4,200"
                  className="w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">
                  Represented Talent
                </label>
                <input
                  type="text"
                  placeholder="Sarah Chen"
                  className="w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-muted rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onCreateOffer}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Add Offer
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
