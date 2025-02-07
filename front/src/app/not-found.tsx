import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image src="/404.svg" width={450} height={450} alt="404" />
      <Link href="/">
        <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-90 text-white">
          Return home
        </Button>
      </Link>
    </div>
  );
}