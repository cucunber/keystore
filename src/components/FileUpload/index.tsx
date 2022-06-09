import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Button, Flex, FormControl, FormLabel, Image, InputGroup } from '@chakra-ui/react'
import {
  MutableRefObject,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
  VFC,
} from 'react'
import { useController } from 'react-hook-form'
import { Text } from 'components/Text'

interface IFileUpload {
  name: any
  acceptedFileTypes: any
  control: any
  onSetHasImgURL: any
  isRequired?: any
}

export const FileUpload: VFC<PropsWithChildren<IFileUpload>> = ({
  name,
  acceptedFileTypes,
  control,
  children,
  onSetHasImgURL,
  isRequired = false,
}) => {
  const [imgURL, setImgURL] = useState('')
  const readFileAsUrl = useCallback(
    (f: File) =>
      new Promise<string>(resolve => {
        const reader = new FileReader()
        reader.onload = function () {
          const readResult = reader.result as string
          resolve(readResult)
        }
        reader.onerror = function () {
          resolve('null')
        }
        reader.readAsDataURL(f)
      }),
    [],
  )
  const fileWorker = useCallback(
    async (f: File) => {
      const url = await readFileAsUrl(f)
      setImgURL(url)
    },
    [readFileAsUrl],
  )

  const inputRef = useRef() as MutableRefObject<HTMLInputElement>
  const {
    field: { ref, onChange, value, ...inputProps },
  } = useController({
    name,
    control,
    rules: { required: isRequired },
  })

  useEffect(() => {
    fileWorker(value)
  }, [fileWorker, value])

  useEffect(() => {
    onSetHasImgURL(Boolean(imgURL.length))
  }, [imgURL, onSetHasImgURL])

  return (
    <FormControl isRequired={false}>
      <FormLabel htmlFor='writeUpFile'>{children}</FormLabel>
      <InputGroup>
        <input
          type='file'
          accept={acceptedFileTypes}
          id={name}
          ref={inputRef}
          {...inputProps}
          onChange={(e: any) => onChange(e.target.files[0])}
          // inputRef={ref}
          style={{ display: 'none' }}
        ></input>
        <Flex justifyContent='flex-start' alignItems='center' gap={5} mt={4}>
          {imgURL ? (
            <Image maxW='100px' maxH='100px' src={imgURL} alt='uploadedImage' />
          ) : (
            <Button
              w='180px'
              colorScheme='lime'
              leftIcon={<AddIcon />}
              onClick={() => inputRef.current.click()}
            >
              <Text translation='profile.levelVerification1.uploadFile' />
            </Button>
          )}
          <Button
            w='180px'
            colorScheme='lime'
            variant='outline'
            leftIcon={<MinusIcon />}
            onClick={() => setImgURL('')}
          >
            <Text translation='profile.levelVerification1.removeFile' />
          </Button>
          {!imgURL && <Text translation='profile.levelVerification1.noFile' />}
        </Flex>
      </InputGroup>
    </FormControl>
  )
}
