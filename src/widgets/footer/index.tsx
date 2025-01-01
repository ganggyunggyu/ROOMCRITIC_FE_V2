import { cn } from '../../shared/lib/cn';
import { useAppSelector } from '../../app/store';
export function Footer() {
  const { isDarkMode } = useAppSelector((state) => state.darkMode);
  return (
    <footer
      className={cn(
        ` flex flex-col items-center justify-center w-full gap-5 p-10 opacity-60 text-sm`,
      )}
    >
      <p>develop by 강경규</p>
      <p>connect</p>
      <p>qwzx16@naver.com</p>
      <a
        href="https://github.com/ganggyunggyu"
        className={`text-green-500 hover:text-green-700 ${isDarkMode && 'text-green-300'}`}
      >
        GitHub
      </a>
      <a
        href="https://velog.io/@qwzx16/posts"
        className={`text-green-500 hover:text-green-700 ${isDarkMode && 'text-green-300'}`}
      >
        Blog
      </a>
    </footer>
  );
}
