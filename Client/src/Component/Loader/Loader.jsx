import {ScaleLoader} from 'react-spinners'

const Loader = () => {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'50vh'}}>
      <ScaleLoader color="#37d7b7" />
    </div>
  );
}

export default Loader