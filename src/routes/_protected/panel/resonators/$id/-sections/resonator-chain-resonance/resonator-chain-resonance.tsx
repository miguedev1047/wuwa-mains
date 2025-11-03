import {
  EditableBlock,
  EditableBlockList,
  EditableBlockItem,
  EditableBlockHeader,
  EditableBlockTitle,
  EditableBlockMedia,
  EditableBlockActions,
  EditableBlockGroup,
  EditableBlockBody,
  EditableBlockActionItem,
} from "@/components/shared-ui/editable-block";
import { AddChainResonance } from "@panel/resonators/$id/-sections/resonator-chain-resonance/-components/add-chain-resonance";
import { EmptyChainResonance } from "@panel/resonators/$id/-sections/resonator-chain-resonance/-components/empty-chain-resonance";
import { EditChainResonance } from "@panel/resonators/$id/-sections/resonator-chain-resonance/-components/edit-chain-resonance";
import { DeleteChainResonance } from "@panel/resonators/$id/-sections/resonator-chain-resonance/-components/delete-chain-resonance";
import { useGetResonator } from "@panel/resonators/$id/-hooks/use-get-resonator";
import { Separator } from "@/components/ui/separator";
import { TiptapPreview } from "@/components/shared-ui/editor";

export function ResonatorChanResonance() {
  const resonator = useGetResonator();
  const chainResonance = resonator.resonance_chain;

  return (
    <EditableBlock
      title="Cadena de resonancia"
      description="Cadena de resonancia del resonador."
      addItem={<AddChainResonance />}
    >
      <EditableBlockList
        emptyContent={<EmptyChainResonance />}
        getKey={(key) => key.id}
        items={chainResonance}
      >
        {(item) => (
          <EditableBlockItem>
            <EditableBlockGroup>
              <EditableBlockMedia>
                <img
                  src={item.chain_resonance_image}
                  alt={item.name}
                  loading="lazy"
                  className="size-full"
                />
              </EditableBlockMedia>
              <EditableBlockHeader>
                <EditableBlockTitle>{item.name}</EditableBlockTitle>
              </EditableBlockHeader>
              <EditableBlockActions>
                <EditableBlockActionItem asChild>
                  <EditChainResonance {...item} />
                </EditableBlockActionItem>
                <EditableBlockActionItem asChild>
                  <DeleteChainResonance {...item} />
                </EditableBlockActionItem>
              </EditableBlockActions>
            </EditableBlockGroup>
            <Separator />
            <EditableBlockBody>
              <TiptapPreview content={item.description} />
            </EditableBlockBody>
          </EditableBlockItem>
        )}
      </EditableBlockList>
    </EditableBlock>
  );
}
