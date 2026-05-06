import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

const rates = [
    { id: "walkOn", label: "Walk-on Passenger", oneWay: 5, roundTrip: 10 },
    { id: "motorcycle", label: "Motorcycle / Golf Cart + Rider", oneWay: 15, roundTrip: 30 },
    { id: "car", label: "Car / Pickup / SUV / Van + Driver", oneWay: 20, roundTrip: 40 },
    { id: "buggy", label: "Horse & Buggy + Driver", oneWay: 30, roundTrip: 60 },
    { id: "trailer", label: "Trailer", oneWay: 20, roundTrip: 40 },
    { id: "extraPassenger", label: "Additional Passenger", oneWay: 5, roundTrip: 10 },
];
const cardColors = [
    "bg-yellow-900/40 border-yellow-700 dark:bg-yellow-900/60 dark:border-yellow-700",
    "bg-red-900/40 border-red-700 dark:bg-red-900/40 dark:border-red-700",
    "bg-emerald-900/40 border-emerald-700 dark:bg-emerald-900/40 dark:border-emerald-700",
    "bg-sky-900/40 border-sky-700 dark:bg-sky-900/40 dark:border-sky-700",
    "bg-indigo-900/40 border-indigo-700 dark:bg-indigo-900/40 dark:border-indigo-700",
    "bg-orange-900/40 border-orange-700 dark:bg-orange-900/60 dark:border-orange-700",
];
export default function FerryRateCalculator() {
    const [cashPaid, setCashPaid] = useState("");
    const [tripType, setTripType] = useState<"oneWay" | "roundTrip">("oneWay");
    const resetAll = () => {
        setQuantities({
            walkOn: 0,
            motorcycle: 0,
            car: 0,
            buggy: 0,
            trailer: 0,
            extraPassenger: 0,
        });

        setCashPaid("");
    };
    const [quantities, setQuantities] = useState<Record<string, number>>({
        walkOn: 0,
        motorcycle: 0,
        car: 0,
        buggy: 0,
        trailer: 0,
        extraPassenger: 0,
    });

    const updateQuantity = (id: string, amount: number) => {
        setQuantities((current) => ({
            ...current,
            [id]: Math.max(0, current[id] + amount),
        }));
    };

    const total = rates.reduce((sum, rate) => {
        return sum + quantities[rate.id] * rate[tripType];
    }, 0);
    const cashPaidNumber = Number(cashPaid) || 0;
    const changeDue = cashPaidNumber - total;
    const summaryItems = rates
        .map((rate) => {
            const qty = quantities[rate.id];
            if (qty === 0) return null;

            return {
                label: rate.label,
                quantity: qty,
                unitPrice: rate[tripType],
                total: qty * rate[tripType],
            };
        })
        .filter((item): item is {
            label: string;
            quantity: number;
            unitPrice: number;
            total: number;
        } => item !== null);
    return (
        <div className="mx-auto max-w-5xl space-y-6 p-6">
            <div>
                <h1 className="text-3xl font-bold">Millersburg Ferry Rate Calculator</h1>
                <p className="text-muted-foreground">
                    Select one-way or round-trip, then add passengers and vehicles.
                </p>
            </div>

            <div className="flex gap-2">
                <Button
                    variant={tripType === "oneWay" ? "default" : "outline"}
                    onClick={() => setTripType("oneWay")}
                >
                    One Way
                </Button>

                <Button
                    variant={tripType === "roundTrip" ? "default" : "outline"}
                    onClick={() => setTripType("roundTrip")}
                >
                    Round Trip
                </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {rates.map((rate, index) => (
                    <Card
                        key={rate.id}
                        className={`${cardColors[index % cardColors.length]} shadow-md transition hover:shadow-lg`}
                    >
                        <CardHeader>
                            <CardTitle className="text-base font-semibold">
                                {rate.label}
                            </CardTitle>

                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="text-2xl font-bold">
                                ${rate[tripType]}
                            </div>

                            <div className="flex items-center justify-between">
                                <Label>Quantity</Label>

                                <div className="flex items-center gap-3">
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() => updateQuantity(rate.id, -1)}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>

                                    <span className="w-6 text-center font-semibold">
                                        {quantities[rate.id]}
                                    </span>

                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() => updateQuantity(rate.id, 1)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {summaryItems.length > 0 && (
                <Card>
                    <CardContent className="p-6 space-y-4">
                        <div className="text-lg font-semibold">Summary</div>

                        <div className="space-y-2">
                            {summaryItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center text-sm"
                                >
                                    <div>
                                        <span className="font-medium">{item.label}</span>
                                        <span className="text-muted-foreground ml-2">
                                            x{item.quantity}
                                        </span>
                                    </div>

                                    <div className="font-semibold">
                                        ${item.total}

                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}


            <Card>
                <CardContent className="p-6 space-y-6">

                    {/* TOTAL */}
                    <div className="flex items-center justify-between border-b pb-4">
                        <span className="text-2xl font-semibold">Total</span>

                        <span className="text-5xl font-bold tracking-tight">
                            ${total.toFixed(2)}
                        </span>
                    </div>

                    {/* PAYMENT */}
                    <div className="grid gap-6 md:grid-cols-2">

                        {/* CASH INPUT */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="cashPaid"
                                className="text-base font-semibold"
                            >
                                Cash Paid
                            </Label>

                            <Input
                                id="cashPaid"
                                type="number"
                                min="0"
                                step="0.01"
                                value={cashPaid}
                                onChange={(e) => setCashPaid(e.target.value)}
                                placeholder="0.00"
                                className="h-14 text-2xl font-semibold"
                            />
                        </div>

                        {/* CHANGE DUE */}
                        <div className="space-y-2">
                            <Label className="text-base font-semibold">
                                Change Due
                            </Label>

                            <div className="flex h-14 items-center justify-between rounded-lg border bg-muted/40 px-4">
                                <span className="text-muted-foreground">
                                    Amount
                                </span>

                                <span
                                    className={`text-3xl font-bold ${changeDue < 0
                                        ? "text-destructive"
                                        : "text-green-600"
                                        }`}
                                >
                                    ${Math.max(changeDue, 0).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* UNDERPAY WARNING */}
                    {changeDue < 0 && (
                        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-500 font-medium">
                            Customer still owes ${Math.abs(changeDue).toFixed(2)}
                        </div>
                    )}

                    {/* BUTTON */}
                    <Button
                        variant="destructive"
                        onClick={resetAll}
                        className="h-14 w-full text-lg font-bold"
                    >
                        Clear Values
                    </Button>

                </CardContent>
            </Card>
            <p className="text-sm text-muted-foreground">
                Children under 3 ride free. Vehicle rates include the driver/rider.
            </p>
        </div>
    );
}