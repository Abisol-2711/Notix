import Swal from 'sweetalert2';

const confirmDelete = async (tipo = 'nota') => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'myConfirmButton',
      cancelButton: 'myCancelButton',
    },
    buttonsStyling: false,
  });

  const result = await swalWithBootstrapButtons.fire({
    title: '¿Estás seguro?',
    text: `¡No podrás revertir esto!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: `Sí, borrar ${tipo}`,
    cancelButtonText: 'No, cancelar',
    reverseButtons: true,
  });

  if (result.isConfirmed) {
    await swalWithBootstrapButtons.fire({
      title: '¡Eliminada!',
      text: `Tu ${tipo} ha sido eliminada.`,
      icon: 'success',
    });
    return true;
  } else {
    await swalWithBootstrapButtons.fire({
      title: 'Cancelado',
      text: `Tu ${tipo} está a salvo :)`,
      icon: 'error',
    });
    return false;
  }
};

export default confirmDelete;
