import { FC, useEffect } from "react";
import { useTypeSelector } from "../hooks/useTypeSelector";
import { fetchPrompts } from "../store/Slices/promptsSlice/asyncActions";
import { useTypeDispatch } from "../hooks/useTypeDispatch";
import PromptForm, {
  PromptFromLoading,
} from "../modules/Forms/Update/PromptForm";
import { EnumStatus } from "../types/Status";

const PromptsPage: FC = () => {
  const { prompts, status } = useTypeSelector((state) => state.prompts);

  const dispatch = useTypeDispatch();

  useEffect(() => {
    dispatch(fetchPrompts());
  }, []);

  return (
    <div>
      <h1 className="mb-4">ПРОМТЫ</h1>
      <div>
        {status === EnumStatus.LOADING ? (
          <>
            {new Array(3).fill(null).map((_, index) => (
              <PromptFromLoading key={index} />
            ))}
          </>
        ) : (
          <>
            {prompts.map((item) => (
              <PromptForm key={item.id} prompt={item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PromptsPage;
