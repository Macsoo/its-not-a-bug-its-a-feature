import "./globals.css";
import { MikroORM } from "@mikro-orm/postgresql";
import config from "@/mikro-orm.config";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("mikro-orm init");
  const orm = await MikroORM.init(config);
  console.log(orm.em);
  console.log(orm.schema);
  return (
    <html lang="en">
      <body>
        <div className="content">
            {children}
        </div>
      </body>
    </html>
  );
}
