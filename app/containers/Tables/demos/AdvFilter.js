/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Chip from '@material-ui/core/Chip';
// import { Button } from '@material-ui/core';
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
        customBodyRender: (value) => {
          const handleClick = () => {
            // Aquí puedes realizar alguna acción cuando se hace clic en el Chip.
            console.log('Chip clickeado');
          };
          if (value === true) {
            return (
              <Chip label="Active" color="secondary" onClick={handleClick} />
            );
          }
          if (value === false) {
            return (
              <Chip label="Non Active" color="primary" onClick={handleClick} />
            );
          }
          return (
            <Chip label="Unknown" onClick={handleClick} />
          );
        }
      }
    },
    // {
    //   name: 'Estado',
    //   options: {
    //     filter: true,
    //     customBodyRender: (value) => {
    //       if (value === true) {
    //         return (<Chip label="Active" color="secondary" />);
    //       }
    //       if (value === false) {
    //         return (<Chip label="Non Active" color="primary" />);
    //       }
    //       return (<Chip label="Unknown" />);
    //     }
    //   }
    // },
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
      //     const response = await axios.get('https://hotelapp-back.onrender.com/api/comandaRestaurante');
      const response = await axios.get('http://localhost:4000/api/auth/obtenerUsuarios');
      // Accede a los datos de la respuesta
      const registros = response.data.usuarios;
      const datos = registros.map((registro) => [
        registro.name,
        registro.name,
        registro.uid,
        registro.state,
        registro.salario,
      ]);
      console.log(datos);
      // setData(datos.slice(0, 10));
      // return datos;
      setData(datos);
      console.log(datos);
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
    selectableRows: 'single',
    // selectableRowsHideCheckboxes: true,
    // onRowSelectionChange: (currentRowsSelected) => {
    //   if (currentRowsSelected.length > 0) {
    //     const selectedRowIndex = currentRowsSelected[0]; // Obten el índice de la fila seleccionada
    //     const selectedRowData = data[selectedRowIndex]; // Acceder a los datos de la fila seleccionada
    //     console.log('Fila seleccionada:', selectedRowData);
    //     // Acceder a los datos específicos de la fila (por ejemplo, el ID) de esta manera:
    //     const uid = selectedRowData[2]; // El índice depende de la posición de la columna
    //     console.log('UID de la fila seleccionada:', uid);
    //   }
    // },
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
    </div>
  );
}

AdvFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdvFilter);
