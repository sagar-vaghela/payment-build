import React, { useEffect, useState } from 'react';
import type { Page as PageType } from 'src/types/page';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { productsListAPI } from 'src/services/api';
import { useAuth } from 'src/hooks/use-auth';
import { Scrollbar } from 'src/components/scrollbar';
import { IconButton, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';

const Page: PageType = () => {

    const [productActiveList, setProductActiveList] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortKey, setSortKey] = useState('');
    const auth = useAuth();

    useEffect(() => {

        const callApi = async () => {
            const productsList = await productsListAPI('active');
            setProductActiveList(productsList.data);

        };
        callApi();
    }, [auth.token.access_token]);

    console.log("productActiveList---", productActiveList);
    interface HeadCell {
        disablePadding: boolean;
        id: string;
        label: string;
        numeric: boolean;
    }

    const sortData = (key: string, subKey: string) => {
        const order = sortOrder === 'asc' ? 'desc' : 'asc';
        const sorted = [...productActiveList].sort((a, b) => {

            if (subKey) {
                if (a[key][subKey] < b[key][subKey]) {
                    return order === 'asc' ? -1 : 1;
                }
                if (a[key][subKey] > b[key][subKey]) {
                    return order === 'asc' ? 1 : -1;
                }
            } else {
                if (a[key] < b[key]) {
                    return order === 'asc' ? -1 : 1;
                }
                if (a[key] > b[key]) {
                    return order === 'asc' ? 1 : -1;
                }
            }
            return 0;
        });
        setProductActiveList(sorted);
        setSortOrder(order);
        setSortKey(key);
    };

    return (
        <div>
            <Scrollbar>
                <Table sx={{ minWidth: 700 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                               <span className='cursor-pointer' onClick={()=>{ setSortKey('nombre'); sortData('nombre', 'en_EN')}}>Name {sortKey === 'nombre' && <span className='cursor-pointer'>{sortOrder === 'asc' ? '▲' : '▼'}</span>}</span>
                            </TableCell>
                            <TableCell>
                               <span className='cursor-pointer' onClick={()=> {setSortKey('clicks'); sortData('clicks', '')}}>Clicks{sortKey === 'clicks' && <span className='cursor-pointer'>{sortOrder === 'asc' ? '▲' : '▼'}</span>}</span>
                            </TableCell>
                            <TableCell>
                               <span className='cursor-pointer' onClick={()=> {setSortKey('ventas'); sortData('ventas', '')}}>Sales{sortKey === 'ventas' && <span className='cursor-pointer'>{sortOrder === 'asc' ? '▲' : '▼'}</span>}</span>
                            </TableCell>
                            <TableCell>
                                Conversion
                            </TableCell>
                            <TableCell>
                               <span className='cursor-pointer' onClick={()=> {setSortKey('totalvendido'); sortData('totalvendido', '')}}>Total{sortKey === 'totalvendido' && <span className='cursor-pointer'>{sortOrder === 'asc' ? '▲' : '▼'}</span>}</span>
                            </TableCell>
                            <TableCell>
                                Expiration date
                            </TableCell>
                            <TableCell>
                                New clients
                            </TableCell>
                            <TableCell>
                                Type
                            </TableCell>
                            <TableCell>
                                Price
                            </TableCell>
                            <TableCell>
                                Share
                            </TableCell>
                            <TableCell>
                                Management
                            </TableCell>
                            <TableCell>
                                Visible
                            </TableCell>
                            <TableCell>
                                Numero Orden
                            </TableCell>
                            <TableCell>
                                Editar Orden
                            </TableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {productActiveList.map((item: any) => {


                            return (
                                <TableRow key={item.id} hover>

                                    <TableCell>
                                        {item.nombre.en_EN}
                                    </TableCell>

                                    <TableCell>
                                        {item.clicks}
                                    </TableCell>

                                    <TableCell>
                                        {item.ventas}
                                    </TableCell>

                                    <TableCell>
                                        {'item.conversion'}
                                    </TableCell>

                                    <TableCell>
                                        {item.totalvendido.toFixed(2)} €
                                    </TableCell>

                                    <TableCell>
                                        {item.fechacadText ? item.fechacadText : '--'}
                                    </TableCell>

                                    <TableCell>
                                        {item.numNewsClients}
                                    </TableCell>

                                    <TableCell>
                                        {'item.type'}
                                    </TableCell>

                                    <TableCell align='center'>
                                        {item.precio}
                                    </TableCell>

                                    <TableCell align='center'>
                                        {'social'}
                                    </TableCell>

                                    <TableCell align='center'>
                                        <IconButton>
                                            <SvgIcon>
                                                <Edit02Icon />
                                            </SvgIcon>
                                        </IconButton>
                                        <IconButton>
                                            <SvgIcon>
                                                <DeleteOutlineIcon />
                                            </SvgIcon>
                                        </IconButton>
                                    </TableCell>

                                    <TableCell align='center'>
                                        {item.visible ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                    </TableCell>

                                    <TableCell align='center'>
                                        {item.order}
                                    </TableCell>

                                    <TableCell align='center'>
                                        <FormatListBulletedOutlinedIcon />
                                    </TableCell>

                                </TableRow>
                            )
                        })
                        }


                    </TableBody>


                </Table>

            </Scrollbar>
        </div>
    )
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;