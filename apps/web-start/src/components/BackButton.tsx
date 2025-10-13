import { useRouter } from '@tanstack/react-router'

export default function BackButton() {
    const router = useRouter();

    return (
    <button
      onClick={() => router.history.back()}
      className="button-back w-full max-w-xs"
    >
      Back
    </button>
  )
}