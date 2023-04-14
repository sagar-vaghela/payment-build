import React, { useState } from "react";
import {
    Button,
    Card,
    CardContent,
    Checkbox,
    Chip,
    FormLabel,
    Grid,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";
import { Box } from "@mui/system";
import Link from "next/link";

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
const Company = () => {
    const [companyName, setCompanyName] = useState();
    const [vatNumber, setVatNumber] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [province, setProvince] = useState();
    const [postalcode, setPostalcode] = useState();
    const [country, setCountry] = useState([]);
    const [identification, setIdentification] = useState();

    const handletextchange = (event: any) => {
        if (event.target.name === "companyname") {
            setCompanyName(event.target.value);
        }
        if (event.target.name === "vatnumber") {
            setVatNumber(event.target.value);
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
            setIdentification(event.target.value);
        }
    };

    const handleSelectChange = (event: any) => {
        setCountry(event.target.value);
    };
    const handleDelete = () => {
        console.log("You clicked the delete icon.");
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
                            <FormLabel>Company name*</FormLabel>
                            <TextField
                                fullWidth
                                name="companyname"
                                onChange={handletextchange}
                                required
                                value={companyName}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormLabel>VAT NUMBER*</FormLabel>
                            <TextField
                                fullWidth
                                name="vatnumber"
                                onChange={handletextchange}
                                required
                                value={vatNumber}
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
                                helperText={""}
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
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                value={country}
                                fullWidth
                                onChange={handleSelectChange}
                                renderValue={(names: any) => (
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                        <Chip key={names} label={names} onDelete={() => handleDelete} clickable />
                                    </Box>
                                )}
                            >
                                {names.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} marginTop={2}>
                        <Grid item xs={3}>
                            <FormLabel>
                                Identification card for tax purposes. Minimum :
                            </FormLabel>
                            <div>
                                <input
                                    type="file"
                                    name="frontsidefile"
                                    onChange={(event) => handleUpload(event)}
                                    value={identification}
                                    accept="image/png, image/jpeg"
                                    id="fileupload"
                                    className="border border-grey-500 rounded p-2"
                                />
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography>See tax card</Typography>
                        </Grid>
                    </Grid>
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

export default Company;
