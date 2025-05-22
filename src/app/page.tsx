import { Button } from "@/components/ui/button"
import { TestComponent } from "@/features/test"

export default function Home() {
  return (
    <div>
      <Button variant='destructive' size='sm'> Click Me</Button>
      <p className="text-red-500 font-semibold">
        Aero
      </p>

      <TestComponent></TestComponent>
    </div>
  )
}
