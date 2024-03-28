import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@radix-ui/react-separator"
import { HiChevronRight } from "react-icons/hi"

function Dashboard() {
    return (
        <div className='w-full h-full p-10 rounded-t-2xl'>
            <h1 className='text-3xl sora-bold'>Accueil</h1>
            <CardDescription className="-mt-1">Informations générales</CardDescription>
            <div className="mt-10">
                <div>
                    <Card>
                        <CardHeader className="flex flex-row justify-between">
                            <div>
                               <CardTitle className="text-2xl">Étudiants</CardTitle>
                               <CardDescription>Nombres et statistiques</CardDescription>
                            </div>
                            <div>
                                <Button className="w-10 h-10 p-0"><HiChevronRight size={30}/></Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Separator orientation="horizontal" className="my-4"/>
                            <h1 className="text-2xl">Nombre total d'étudiants</h1>
                            <h1 className="text-2xl">Nombre total d'étudiants</h1>
                            <h1 className="text-2xl">Nombre total d'étudiants</h1>
                        </CardContent>
                    </Card>
                </div>
                <div>
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default Dashboard

