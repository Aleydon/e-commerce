import Link from 'next/link';

import Text from './components/Text';

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-linear-to-r from-blue-400 to-purple-300">
      <h1 className="text-bold text-4xl">Hello World</h1>
      <Text>&darr;</Text>

      <Link
        className="cursor-pointer underline"
        href="https://github.com/Aleydon"
        target="_blank"
        aria-label="github.com/Aleydon"
      >
        Github Template
      </Link>
    </div>
  );
}
