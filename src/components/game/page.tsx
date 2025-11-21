import { useState } from "react";
import { Scenario } from "@/types/game";
import { Player } from "@/types/game";
import { quickQuizScenario } from "@/data/quickQuizScenario";
import { ScenarioDisplay } from "@/components/game/ScenarioDisplay";

export default function QuickQuizPage() {
  const [selected, setSelected] = useState<any>(null);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <ScenarioDisplay
        scenario={quickQuizScenario}
        selectedChoice={selected}
        onChoiceSelect={() => {}}
        onSubmit={() => {}}
        showFeedback={false}
      />
    </div>
  );
}
