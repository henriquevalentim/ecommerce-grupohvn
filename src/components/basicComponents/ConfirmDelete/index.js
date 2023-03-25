import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export function handleConfirmDelete(callback) {
  MySwal.fire({
    title: 'Tem certeza que deseja excluir?',
    text: 'Você não poderá desfazer esta ação!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, excluir!',
    cancelButtonText: 'Cancelar'
  }).then(async (result) => {
    if (result.isConfirmed) {
      await callback()
      return Swal.fire(
        'Deletado!',
        'O registro foi deletado com sucesso.',
        'success'
      )
    } else {
      return Swal.fire('Cancelado!', 'O registro não foi deletado.', 'error')
    }
  })
}
