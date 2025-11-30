import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: "TT's Education",
  description: "Online Course Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}
