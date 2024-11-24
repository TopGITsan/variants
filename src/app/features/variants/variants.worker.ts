/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  console.log('>>>>>>>>>>>> worker here, received', data);
  const { variants, searchText } = data;
  const response = searchText
    ? variants.filter((v: any) =>
        v.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : variants;
  postMessage(response);
});
