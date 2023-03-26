import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export function handleConfirmDelete({
  callback,
  title = 'Tem certeza que deseja excluir?',
  text = 'Você não poderá desfazer esta ação!',
  icon = 'warning',
  showCancelButton = true,
  confirmButtonColor = '#3085d6',
  cancelButtonColor = '#d33',
  confirmButtonText = 'Sim, excluir!',
  cancelButtonText = 'Cancelar',
  titleConfirm = 'Deletado!',
  textConfirm = 'O registro foi deletado com sucesso.',
  iconConfirm = 'success',
  titleCancel = 'Cancelado!',
  textCancel = 'O registro não foi deletado.',
  iconCancel = 'error'
}) {
  MySwal.fire({
    title,
    text,
    icon,
    showCancelButton,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText,
    cancelButtonText
  }).then(async (result) => {
    if (result.isConfirmed) {
      await callback()
      return Swal.fire(titleConfirm, textConfirm, iconConfirm)
    } else {
      return Swal.fire(titleCancel, textCancel, iconCancel)
    }
  })
}
