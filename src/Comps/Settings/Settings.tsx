import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@radix-ui/react-separator"

export default function Settings() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <Card className="w-[70%] p-5 py-10  max-w-3xl mx-auto">
                <CardHeader className="space-y-1">
                    <CardTitle className="sora-semibold">
                        Parameters
                    </CardTitle>
                    <CardDescription className="sora-regular">
                        Gérer vos paramètres et préférences
                    </CardDescription>
                </CardHeader>
                <Separator className="my-6" />
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="text-lg font-bold leading-none sora-medium ">
                            Demander le mot de passe au lancement
                            </h2>
                            <p className="text-xs leading-none text-gray-500 dark:text-gray-400 sora-regular ">
                            Demander le mot de passe à chaque lancement de l'application
                            </p>
                        </div>
                        <Switch id="require-password" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

