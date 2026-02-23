
import Heading from '@/components/common/Heading';
import Paragraph from '@/components/common/Paragraph';
import Link from 'next/link';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-color-custom text-center p-8">
    <Heading level={4} className="mb-2 text-(--blue)">404</Heading>
    <Paragraph size="lg" className="text-(--blue) font-semibold mb-2">Page Not Found</Paragraph>
    <Paragraph size='base' className="mb-6 text-(--dark)">Sorry, the page you are looking for does not exist.</Paragraph>
    {/* <Link href="/" aria-label="Go to Home">
      <span className="px-6 py-2 bg-deep-green text-white rounded-xs shadow cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-deep-green">
        Go to Home
      </span>
    </Link> */}

    <Link
      href="/" aria-label="Go to Home"
      className="relative flex justify-center items-center rounded-full bg-transparent overflow-hidden cursor-pointer border border-(--blue) group transition-all duration-300 min-w-[110px]"
    >
      <span className="relative z-20 text-center no-underline w-full px-2 py-1 text-(--blue) text-base transition-all duration-300 group-hover:text-(--white)">Go to Home</span>
      <span className="absolute left-0 top-0 w-full h-0 bg-(--blue) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
    </Link>
  </div>
);

export default NotFound;
