import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Send } from 'lucide-react';

export function P2PTransfer() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Send Money</CardTitle>
            <CardDescription>Instantly transfer funds to anyone.</CardDescription>
        </CardHeader>
        <CardContent>
            <Link href="/dashboard/transfers" className="w-full">
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <Send className="mr-2 h-4 w-4" /> New Transfer
                </Button>
            </Link>
        </CardContent>
    </Card>
  );
}
