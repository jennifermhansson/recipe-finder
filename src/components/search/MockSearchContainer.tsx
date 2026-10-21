import { lazy, Suspense } from "react";
import MockToggle from "./mock/MockToggle";
import { USE_MOCK_DATA } from "../../api/recipes";

// Only referenced in dev, so the mock data is left out of the production bundle
const MockRecipesQuickList = import.meta.env.DEV
  ? lazy(() => import("./mock/MockRecipesQuickList"))
  : null;

type MockSearchContainerProps = {
  onSearch: () => void;
};

function MockSearchContainer({ onSearch }: MockSearchContainerProps) {
  const handleMockSearchToggle = (checked: boolean) => {
    localStorage.setItem("useMock", checked ? "true" : "false");
    window.location.reload();
  };

  if (import.meta.env.DEV && MockRecipesQuickList) {
    return (
      <>
        <MockToggle
          value={USE_MOCK_DATA}
          onChange={handleMockSearchToggle}
        />
        {USE_MOCK_DATA && (
          <Suspense fallback={null}>
            <MockRecipesQuickList onRecipeClick={onSearch} />
          </Suspense>
        )}
      </>
    );
  }
  return <></>;
}

export default MockSearchContainer;
