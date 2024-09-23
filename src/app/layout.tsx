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
      <html lang="hu">
      <head>
          <link href="https://fonts.googleapis.com/css2?family=Itim&display=swap" rel="stylesheet"/>
          <title> Lakatos Brendonék Menhelye</title>
      </head>
      <body>
      <div className="header">
          <img src="" alt="logo"/>
        <h1>Lakatos Brendonék Menhelye</h1>
        <div>
          <button>Regisztráció</button>
          <button>Belépés</button>
        </div>
      </div>
      <div className="menu">
        <div>
          <button>Kutyáink...</button>
          <button>Rólunk</button>
        </div>
        <button>Fiókom</button>
      </div>
      <div className="content">
        <div className="card">
          {children}
        </div>
      </div>
      </body>
      </html>
  );
}
