/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import MUIDataTable from 'mui-datatables';
import { Button } from '@material-ui/core';
const axios = require('axios');

const styles = theme => ({
  table: {
    '& > div': {
      overflow: 'auto'
    },
    '& table': {
      '& td': {
        wordBreak: 'keep-all'
      },
      [theme.breakpoints.down('md')]: {
        '& td': {
          height: 60,
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }
      }
    }
  }
});
/*
  It uses npm mui-datatables. It's easy to use, you just describe columns and data collection.
  Checkout full documentation here :
  https://github.com/gregnb/mui-datatables/blob/master/README.md
*/
function AdvFilter(props) {
  const columns = [
    {
      name: 'Nombre',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => (
          <span onClick={() => handleEdit(tableMeta.rowIndex, tableMeta.columnIndex)}>
            {value}
          </span>
        ),
      },
    },
    {
      name: 'Email',
      options: {
        filter: true,
      }
    },
    {
      name: 'Id',
      options: {
        filter: true,
      }
    },
    {
      name: 'Estado',
      options: {
        filter: true,
      }
    },
    {
      name: 'Salario',
      options: {
        filter: true,
      }
    },
  ];

  const [data, setData] = useState([]);

  const getUsuarios = async () => {
    try {
      const response = await axios.get('https://hotelapp-back.onrender.com/api/comandaRestaurante');
      // Accede a los datos de la respuesta
      const registros = response.data.registros;
      const datos = registros.map((registro) => [
        registro.nombrePax,
        registro.fechaActual,
        registro.idReserva,
        registro.mesero,
        registro.numeroHabitacion,
      ]);
      console.log(datos);
      // setData(datos.slice(0, 10));
      // return datos;
      setData(datos);
    } catch (error) {
      console.error('Error al realizar la solicitud GET:', error);
    }
  };

  const handleEdit = (rowIndex, columnIndex) => {
    // Implementa la lógica de edición aquí.
    // Puedes abrir un cuadro de diálogo de edición o un formulario y actualizar los datos.
    console.log(`Editando fila ${rowIndex}, columna ${columnIndex}`);
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: true,
    rowsPerPage: 10,
    page: 0,
    selectableRowsHideCheckboxes: true,
  };

  const { classes } = props;

  return (
    <div className={classes.table}>
      <MUIDataTable
        title="Lista de Usuarios"
        data={data}
        columns={columns}
        options={options}
      />
      {/* <Button onClick={getUsuarios}>Cargar Usuarios</Button> */}
    </div>
  );
}

AdvFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdvFilter);
