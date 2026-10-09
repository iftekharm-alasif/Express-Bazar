import { Suspense } from "react";
import TodayMarket from "./components/TodayMarket";
import PriceIncreased from "./components/PriceIncreased";
import PriceDecreased from "./components/PriceDecreased";
import AllProducts from "./components/AllProducts";


export default function Home() {
  return (
    <main>
           <Suspense fallback={null}>
          <TodayMarket />
        </Suspense>
        <PriceIncreased></PriceIncreased>
        <PriceDecreased></PriceDecreased>
        <AllProducts></AllProducts>
    </main>
  );
}