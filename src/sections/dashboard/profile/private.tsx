import {
    Button,
    Card,
    CardContent,
    Checkbox,
    Chip,
    FormControlLabel,
    FormLabel,
    Grid,
    ListItemText,
    MenuItem,
    Radio,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import MuiPhoneNumber from "material-ui-phone-number";
import { Box } from "@mui/system";
import Link from "next/link";

interface TypeOption {
    value: string;
    label: string;
}

const OptionRadio: TypeOption[] = [
    {
        value: "notRegistered",
        label: "I am not registered in AEAT of Spain. I am a private individual.",
    },
    {
        value: "registered",
        label: "I am registered in AEAT of Spain. I am self-employed.",
    },
    {
        value: "notResident",
        label: "I am not a resident of Spain",
    },
];

const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
];

const Private = () => {
    const [name, setName] = useState();
    const [lastname, setLastName] = useState();
    const [idCard, setIdcard] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [province, setProvince] = useState();
    const [postalcode, setPostalcode] = useState();
    const [country, setCountry] = useState<any>([]);
    const [frontsideFile, setFrontsideFile] = useState();
    const [backsideFile, setBacksideFile] = useState();
    const [taxRegime, setTaxRegime] = useState("notRegistered");

    const handletextchange = (event: any) => {
        if (event.target.name === "name") {
            setName(event.target.value);
        }
        if (event.target.name === "lastname") {
            setLastName(event.target.value);
        }
        if (event.target.name === "idcard") {
            setIdcard(event.target.value);
        }
        if (event.target.name === "address") {
            setAddress(event.target.value);
        }
        if (event.target.name === "city") {
            setCity(event.target.value);
        }
        if (event.target.name === "province") {
            setProvince(event.target.value);
        }
        if (event.target.name === "postalcode") {
            setPostalcode(event.target.value);
        }
    };

    const handleUpload = (event: any) => {
        if (event.target.name === "frontsidefile") {
            setFrontsideFile(event.target.valu);
        }
        if (event.target.name === "backsidefile") {
            setBacksideFile(event.target.valu);
        }
    };

    const handleSelectChange = (event: any) => {
        setCountry(event.target.value);
    };
    const handleDelete = () => {
        console.log("You clicked the delete icon.");
    };
    const handleTaxRegimechange = (event: any) => {
        setTaxRegime(event?.target.value);
    };
    const handleClick = () => {
        console.log("Click on save");
    };
    const handlephonechange = (event: any) => {
        setPhone(event);
    };

    return (
        <Stack spacing={4}>
            <Card>
                <CardContent>
                    <Grid container spacing={2} marginTop={2}>
                        <Grid item xs={3}>
                            <FormLabel>Name*</FormLabel>
                            <TextField
                                fullWidth
                                name="name"
                                onChange={handletextchange}
                                required
                                value={name}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormLabel>Last name*</FormLabel>
                            <TextField
                                fullWidth
                                name="lastname"
                                onChange={handletextchange}
                                required
                                value={lastname}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormLabel>ID CARD*</FormLabel>
                            <TextField
                                fullWidth
                                name="idcard"
                                onChange={handletextchange}
                                required
                                value={idCard}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormLabel>Phone*</FormLabel>
                            <MuiPhoneNumber
                                countryCodeEditable={false}
                                defaultCountry={"es"}
                                placeholder="681 93 14 84"
                                onChange={handlephonechange}
                                disableCountryCode={false}
                                disableAreaCodes={true}
                                variant="outlined"
                                value={phone}
                                fullWidth
                            />
                        </Grid>
                    </Grid>

                    <Grid xs={12} marginTop={2}>
                        <FormLabel>Address*</FormLabel>
                        <TextField
                            fullWidth
                            name="address"
                            onChange={handletextchange}
                            required
                            value={address}
                        />
                    </Grid>

                    <Grid container spacing={2} marginTop={2}>
                        <Grid item xs={3}>
                            <FormLabel>City*</FormLabel>
                            <TextField
                                fullWidth
                                name="city"
                                onChange={handletextchange}
                                required
                                value={city}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormLabel>Province*</FormLabel>
                            <TextField
                                fullWidth
                                name="province"
                                onChange={handletextchange}
                                required
                                value={province}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormLabel>Postal code*</FormLabel>
                            <TextField
                                fullWidth
                                name="postalcode"
                                onChange={handletextchange}
                                required
                                value={postalcode}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormLabel>Country*</FormLabel>
                            <Select
                                value={country}
                                fullWidth
                                onChange={handleSelectChange}
                                renderValue={(names: any) => (
                                    // <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                        <Chip label={names} onDelete={handleDelete} />
                                    // </Box>
                                )}
                            >
                                {names.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={country.includes(name)} />
                                        <ListItemText primary={name} />
                                        {/* {name} */}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} marginTop={2}>
                        <Grid item xs={3}>
                            <FormLabel>ID card front side :</FormLabel>
                            <div>
                                <input
                                    type="file"
                                    name="frontsidefile"
                                    onChange={(event) => handleUpload(event)}
                                    value={frontsideFile}
                                    accept="image/png, image/jpeg"
                                    id="fileupload"
                                    className="border border-grey-500 rounded p-2"
                                />
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography>See ID CARD front side</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <FormLabel>ID card back side :</FormLabel>
                            <div>
                                <input
                                    type="file"
                                    name="backsidefile"
                                    onChange={(event) => handleUpload(event)}
                                    value={backsideFile}
                                    accept="image/png, image/jpeg"
                                    id="fileupload"
                                    className="border border-grey-500 rounded p-2"
                                />
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography>See ID CARD back side</Typography>
                        </Grid>
                    </Grid>
                    <div>
                        <FormLabel>Tax regime</FormLabel>
                        <div>
                            {OptionRadio.map((item) => (
                                <FormControlLabel
                                    control={
                                        <Radio
                                            className="inline"
                                            checked={item.value === taxRegime}
                                        />
                                    }
                                    key={item.value}
                                    label={<Typography variant="body1">{item.label}</Typography>}
                                    value={item.value}
                                    onClick={(event) => handleTaxRegimechange(event)}
                                />
                            ))}
                        </div>
                    </div>

                    <Grid container spacing={2} marginTop={2}>
                        <Grid item xs={12} md={1}>
                            <Button variant="contained" onClick={handleClick}>
                                Save
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={11}>
                            <Typography>
                                Fill in your fiscal data, your payment method and you will be
                                able to make a payment when you have generated a minimum of 100€
                            </Typography>
                            <div>
                                <Checkbox defaultChecked className="inline-block" />
                                <Typography className="inline-block">
                                    * I accept the{" "}
                                    <Link
                                        href={""}
                                        style={{ color: "blue", textDecoration: "underline" }}
                                    >
                                        conditions of use, privacy and data protection
                                    </Link>{" "}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Stack>
    );
};

export default Private;
