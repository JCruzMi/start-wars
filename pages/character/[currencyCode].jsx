import { useRouter } from "next/router";
import Tags from "../../components/Tags";

export default function CurrencyPage() {
  const router = useRouter();
  const { currencyCode } = router.query;

  return (
    <>
      <Tags currencyCode={currencyCode} />
    </>  
  );
}

