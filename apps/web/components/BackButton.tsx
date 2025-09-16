import { useRouter } from "next/navigation"

export default function BackButton() {
    const router = useRouter();

    return (
    <button
      onClick={() => router.back()}
      className="button-back w-full max-w-xs"
    >
      Back
    </button>
  )
}