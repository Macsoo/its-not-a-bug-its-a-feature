
import styles from "./ui/globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={styles["main"]}>
        <div className={styles.content}>
            {children}
        </div>
      </body>
    </html>
  );
}
