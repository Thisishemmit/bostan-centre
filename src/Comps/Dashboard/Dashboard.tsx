import {
    Activity,
    ArrowUpRight,
    BookCopy,
    DollarSign,
    EyeIcon,
    Users,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const BoxA = () => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-light">
                Paiements Total
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-5xl thunder-bold">5,231.89 DH</div>
            <p className="text-xs text-muted-foreground">
                +20% par rapport au mois dernier
            </p>
        </CardContent>
    </Card>
)
const BoxB = () => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-light">
                Ètudiants
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-5xl thunder-bold">236</div>
            <p className="text-xs text-muted-foreground">
                +180.1% par rapport au mois dernier
            </p>
        </CardContent>
    </Card>
)

const BoxC = () => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-light">Cours</CardTitle>
            <BookCopy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-5xl thunder-bold">12</div>
            <p className="text-xs text-muted-foreground">
                +19% par rapport au mois dernier
            </p>
        </CardContent>
    </Card>
)

const BoxD = () => (
    <Card className="shadow-red-200 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-light">Non payé</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-5xl thunder-bold">38</div>
            <p className="text-xs text-muted-foreground">
                16% du total des étudiants
            </p>
        </CardContent>
    </Card>
)

const BoxE = () => (
    <Card className="col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-light">
                Statistiques des non-payeurs
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
    </Card>
)

const BoxTable = () => (
    <Card className="2xl:col-span-2">
        <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
                <CardTitle className="text-3xl">Liste des étudiants</CardTitle>
                <CardDescription className="font-medium">
                    Étudiants récemment inscrits
                </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
                <div>
                    <p className="text-base">Voir tout</p>
                    <ArrowUpRight className="h-4 w-4" />
                </div>
            </Button>
        </CardHeader>
        <CardContent>
            <Table className="py-2">
                <TableHeader>
                    <TableRow>
                        <TableHead>Étudiant</TableHead>
                        <TableHead>Division</TableHead>
                        <TableHead>Résumé</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage alt="Avatar" src="/avatars/01.png" />
                                    <AvatarFallback>MK</AvatarFallback>
                                </Avatar>
                                <div className="font-medium">Mohamed Karroumi</div>
                            </div>
                        </TableCell>
                        <TableCell>Primaire</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-4 rounded-lg bg-[#59ff80] cursor-pointer" />
                                    <div className="w-2 h-4 rounded-lg bg-[#59ff80] cursor-pointer" />
                                    <div className="w-2 h-4 rounded-lg bg-[#59ff80] cursor-pointer" />
                                    <div className="w-2 h-4 rounded-lg bg-[#ff595e] cursor-pointer" />
                                    <div className="w-2 h-4 rounded-lg bg-[#b0b0b0] cursor-pointer" />
                                </div>
                                <Button variant="secondary" className="size-8 p-0 rounded-full flex items-center justify-center">
                                    <ArrowUpRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </TableCell>
                        <TableCell className="text-start">
                            <Button size="icon" variant="outline">
                                <EyeIcon className="h-4 w-4" />
                                <span className="sr-only">Voir l'étudiant</span>
                            </Button>
                        </TableCell>
                    </TableRow><TableRow>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage alt="Avatar" src="/avatars/01.png" />
                                    <AvatarFallback>MK</AvatarFallback>
                                </Avatar>
                                <div className="font-medium">Mohamed Karroumi</div>
                            </div>
                        </TableCell>
                        <TableCell>Primaire</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-4 rounded-lg bg-[#59ff80] cursor-pointer" />
                                    <div className="w-2 h-4 rounded-lg bg-[#59ff80] cursor-pointer" />
                                    <div className="w-2 h-4 rounded-lg bg-[#59ff80] cursor-pointer" />
                                    <div className="w-2 h-4 rounded-lg bg-[#ff595e] cursor-pointer" />
                                    <div className="w-2 h-4 rounded-lg bg-[#b0b0b0] cursor-pointer" />
                                </div>
                                <Button variant="secondary" className="size-8 p-0 rounded-full flex items-center justify-center">
                                    <ArrowUpRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </TableCell>
                        <TableCell className="text-start">
                            <Button size="icon" variant="outline">
                                <EyeIcon className="h-4 w-4" />
                                <span className="sr-only">Voir l'étudiant</span>
                            </Button>
                        </TableCell>
                    </TableRow><TableRow>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage alt="Avatar" src="/avatars/01.png" />
                                    <AvatarFallback>MK</AvatarFallback>
                                </Avatar>
                                <div className="font-medium">Mohamed Karroumi</div>
                            </div>
                        </TableCell>
                        <TableCell>Primaire</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-4 rounded-lg bg-[#59ff80] cursor-pointer" />
                                    <div className="w-2 h-4 rounded-lg bg-[#59ff80] cursor-pointer" />
                                    <div className="w-2 h-4 rounded-lg bg-[#59ff80] cursor-pointer" />
                                    <div className="w-2 h-4 rounded-lg bg-[#ff595e] cursor-pointer" />
                                    <div className="w-2 h-4 rounded-lg bg-[#b0b0b0] cursor-pointer" />
                                </div>
                                <Button variant="secondary" className="size-8 p-0 rounded-full flex items-center justify-center">
                                    <ArrowUpRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </TableCell>
                        <TableCell className="text-start">
                            <Button size="icon" variant="outline">
                                <EyeIcon className="h-4 w-4" />
                                <span className="sr-only">Voir l'étudiant</span>
                            </Button>
                        </TableCell>
                    </TableRow><TableRow>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage alt="Avatar" src="/avatars/01.png" />
                                    <AvatarFallback>MK</AvatarFallback>
                                </Avatar>
                                <div className="font-medium">Mohamed Karroumi</div>
                            </div>
                        </TableCell>
                        <TableCell>Primaire</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-4 rounded-lg bg-[#59ff80] cursor-pointer" />
                                    <div className="w-2 h-4 rounded-lg bg-[#59ff80] cursor-pointer" />
                                    <div className="w-2 h-4 rounded-lg bg-[#59ff80] cursor-pointer" />
                                    <div className="w-2 h-4 rounded-lg bg-[#ff595e] cursor-pointer" />
                                    <div className="w-2 h-4 rounded-lg bg-[#b0b0b0] cursor-pointer" />
                                </div>
                                <Button variant="secondary" className="size-8 p-0 rounded-full flex items-center justify-center">
                                    <ArrowUpRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </TableCell>
                        <TableCell className="text-start">
                            <Button size="icon" variant="outline">
                                <EyeIcon className="h-4 w-4" />
                                <span className="sr-only">Voir l'étudiant</span>
                            </Button>
                        </TableCell>
                    </TableRow><TableRow>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage alt="Avatar" src="/avatars/01.png" />
                                    <AvatarFallback>MK</AvatarFallback>
                                </Avatar>
                                <div className="font-medium">Mohamed Karroumi</div>
                            </div>
                        </TableCell>
                        <TableCell>Primaire</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-4 rounded-lg bg-[#59ff80] cursor-pointer" />
                                    <div className="w-2 h-4 rounded-lg bg-[#59ff80] cursor-pointer" />
                                    <div className="w-2 h-4 rounded-lg bg-[#59ff80] cursor-pointer" />
                                    <div className="w-2 h-4 rounded-lg bg-[#ff595e] cursor-pointer" />
                                    <div className="w-2 h-4 rounded-lg bg-[#b0b0b0] cursor-pointer" />
                                </div>
                                <Button variant="secondary" className="size-8 p-0 rounded-full flex items-center justify-center">
                                    <ArrowUpRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </TableCell>
                        <TableCell className="text-start">
                            <Button size="icon" variant="outline">
                                <EyeIcon className="h-4 w-4" />
                                <span className="sr-only">Voir l'étudiant</span>
                            </Button>
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </CardContent>
    </Card>
)

const BoxNonPaye = () => (
    <Card>
        <CardHeader>
            <CardTitle className="text-3xl">Résumé du non-payeur</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8"></CardContent>
    </Card>
)

export default function Dashboard() {
    return (
        <div className="flex h-full overflow-x-scroll w-full flex-col">
            <header className="flex items-center justify-between gap-5 px-4 pt-4 md:px-8 md:pt-8 w-full">
                <div>
                    <h1 className="text-9xl thunder-semi-bold pt-5 pl-6">Accueil</h1>
                </div>
                <div className="grid gap-4 md:gap-8 xl:grid-cols-3 lg:grid-cols-2">
                    <BoxA />
                    <BoxB />
                    <BoxC />
                    <BoxD />
                    <BoxE />
                </div>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:gap-8 xl:grid-cols-1 2xl:grid-cols-3">
                    <BoxNonPaye />
                    <BoxTable />
                </div>
            </main>
        </div>
    )
}
