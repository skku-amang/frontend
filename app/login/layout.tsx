import RootHeaderAndFooterWrapper from "@/components/RootHeaderAndFooterWrapper"

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <RootHeaderAndFooterWrapper headerMode="light">
      {children}
    </RootHeaderAndFooterWrapper>
  )
}
