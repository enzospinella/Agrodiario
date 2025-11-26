import { validate } from 'class-validator';
import { CreateCultureDto } from './create-culture.dto';
import { CultureOrigin } from '../enums/culture-origin.enum';

describe('CreateCultureDto', () => {
  describe('propertyId', () => {
    it('deve validar com sucesso quando propertyId é um UUID v4 válido', async () => {
      // Arrange
      const dto = new CreateCultureDto();
      dto.propertyId = 'a1b2c3d4-e5f6-4789-a012-3456789abcde'; // UUID v4
      dto.cycle = 120;
      dto.origin = CultureOrigin.ORGANIC;

      // Act
      const errors = await validate(dto);

      // Assert
      expect(errors.length).toBe(0);
    });

    it('deve falhar quando propertyId está vazio', async () => {
      // Arrange
      const dto = new CreateCultureDto();
      dto.propertyId = '';
      dto.cycle = 120;
      dto.origin = CultureOrigin.ORGANIC;

      // Act
      const errors = await validate(dto);

      // Assert
      expect(errors.length).toBeGreaterThan(0);
      const propertyIdError = errors.find((e) => e.property === 'propertyId');
      expect(propertyIdError).toBeDefined();
      expect(propertyIdError?.constraints?.isNotEmpty).toBe(
        'Propriedade associada é obrigatória',
      );
    });

    it('deve falhar quando propertyId é undefined', async () => {
      // Arrange
      const dto = new CreateCultureDto();

      // Act
      const errors = await validate(dto);

      // Assert
      expect(errors.length).toBeGreaterThan(0);
      const propertyIdError = errors.find((e) => e.property === 'propertyId');
      expect(propertyIdError).toBeDefined();
      expect(propertyIdError?.constraints?.isNotEmpty).toBe(
        'Propriedade associada é obrigatória',
      );
    });

    it('deve falhar quando propertyId não é um UUID válido', async () => {
      // Arrange
      const dto = new CreateCultureDto();
      dto.propertyId = 'nao-e-uuid';
      dto.cycle = 120;
      dto.origin = CultureOrigin.ORGANIC;

      // Act
      const errors = await validate(dto);

      // Assert
      expect(errors.length).toBeGreaterThan(0);
      const propertyIdError = errors.find((e) => e.property === 'propertyId');
      expect(propertyIdError).toBeDefined();
      expect(propertyIdError?.constraints?.isUuid).toBe(
        'ID da propriedade inválido',
      );
    });

    it('deve falhar quando propertyId é um número', async () => {
      // Arrange
      const dto = new CreateCultureDto();
      dto.propertyId = 12345 as any;
      dto.cycle = 120;
      dto.origin = CultureOrigin.ORGANIC;

      // Act
      const errors = await validate(dto);

      // Assert
      expect(errors.length).toBeGreaterThan(0);
      const propertyIdError = errors.find((e) => e.property === 'propertyId');
      expect(propertyIdError).toBeDefined();
      expect(propertyIdError?.constraints?.isUuid).toBe(
        'ID da propriedade inválido',
      );
    });
  });

  describe('cycle', () => {
    it('deve validar com sucesso quando cycle é um número inteiro positivo', async () => {
      // Arrange
      const dto = new CreateCultureDto();
      dto.propertyId = 'a1b2c3d4-e5f6-4789-a012-3456789abcde';
      dto.cycle = 120;
      dto.origin = CultureOrigin.ORGANIC;

      // Act
      const errors = await validate(dto);

      // Assert
      expect(errors.length).toBe(0);
    });

    it('deve falhar quando cycle está vazio', async () => {
      // Arrange
      const dto = new CreateCultureDto();
      dto.propertyId = 'a1b2c3d4-e5f6-4789-a012-3456789abcde';
      dto.cycle = null as any;
      dto.origin = CultureOrigin.ORGANIC;

      // Act
      const errors = await validate(dto);

      // Assert
      expect(errors.length).toBeGreaterThan(0);
      const cycleError = errors.find((e) => e.property === 'cycle');
      expect(cycleError).toBeDefined();
      expect(cycleError?.constraints?.isNotEmpty).toBe(
        'Ciclo da cultura é obrigatório',
      );
    });

    it('deve falhar quando cycle é undefined', async () => {
      // Arrange
      const dto = new CreateCultureDto();
      dto.propertyId = 'a1b2c3d4-e5f6-4789-a012-3456789abcde';
      dto.origin = CultureOrigin.ORGANIC;

      // Act
      const errors = await validate(dto);

      // Assert
      expect(errors.length).toBeGreaterThan(0);
      const cycleError = errors.find((e) => e.property === 'cycle');
      expect(cycleError).toBeDefined();
      expect(cycleError?.constraints?.isNotEmpty).toBe(
        'Ciclo da cultura é obrigatório',
      );
    });

    it('deve falhar quando cycle não é um inteiro', async () => {
      // Arrange
      const dto = new CreateCultureDto();
      dto.propertyId = 'a1b2c3d4-e5f6-4789-a012-3456789abcde';
      dto.cycle = 120.5;
      dto.origin = CultureOrigin.ORGANIC;

      // Act
      const errors = await validate(dto);

      // Assert
      expect(errors.length).toBeGreaterThan(0);
      const cycleError = errors.find((e) => e.property === 'cycle');
      expect(cycleError).toBeDefined();
      expect(cycleError?.constraints?.isInt).toBe(
        'Ciclo deve ser um número inteiro',
      );
    });

    it('deve falhar quando cycle é zero', async () => {
      // Arrange
      const dto = new CreateCultureDto();
      dto.propertyId = 'a1b2c3d4-e5f6-4789-a012-3456789abcde';
      dto.cycle = 0;
      dto.origin = CultureOrigin.ORGANIC;

      // Act
      const errors = await validate(dto);

      // Assert
      expect(errors.length).toBeGreaterThan(0);
      const cycleError = errors.find((e) => e.property === 'cycle');
      expect(cycleError).toBeDefined();
      expect(cycleError?.constraints?.min).toBe(
        'Ciclo deve ser maior que zero',
      );
    });

    it('deve falhar quando cycle é negativo', async () => {
      // Arrange
      const dto = new CreateCultureDto();
      dto.propertyId = 'a1b2c3d4-e5f6-4789-a012-3456789abcde';
      dto.cycle = -10;
      dto.origin = CultureOrigin.ORGANIC;

      // Act
      const errors = await validate(dto);

      // Assert
      expect(errors.length).toBeGreaterThan(0);
      const cycleError = errors.find((e) => e.property === 'cycle');
      expect(cycleError).toBeDefined();
      expect(cycleError?.constraints?.min).toBe(
        'Ciclo deve ser maior que zero',
      );
    });

    it('deve falhar quando cycle é uma string', async () => {
      // Arrange
      const dto = new CreateCultureDto();
      dto.propertyId = 'a1b2c3d4-e5f6-4789-a012-3456789abcde';
      dto.cycle = '120' as any;
      dto.origin = CultureOrigin.ORGANIC;

      // Act
      const errors = await validate(dto);

      // Assert
      expect(errors.length).toBeGreaterThan(0);
      const cycleError = errors.find((e) => e.property === 'cycle');
      expect(cycleError).toBeDefined();
      expect(cycleError?.constraints?.isInt).toBe(
        'Ciclo deve ser um número inteiro',
      );
    });
  });

  describe('origin', () => {
    it('deve validar com sucesso quando origin é ORGANIC', async () => {
      // Arrange
      const dto = new CreateCultureDto();
      dto.propertyId = 'a1b2c3d4-e5f6-4789-a012-3456789abcde';
      dto.cycle = 120;
      dto.origin = CultureOrigin.ORGANIC;

      // Act
      const errors = await validate(dto);

      // Assert
      expect(errors.length).toBe(0);
    });

    it('deve validar com sucesso quando origin é CONVENTIONAL', async () => {
      // Arrange
      const dto = new CreateCultureDto();
      dto.propertyId = 'a1b2c3d4-e5f6-4789-a012-3456789abcde';
      dto.cycle = 120;
      dto.origin = CultureOrigin.CONVENTIONAL;

      // Act
      const errors = await validate(dto);

      // Assert
      expect(errors.length).toBe(0);
    });

    it('deve validar com sucesso quando origin é TRANSGENIC', async () => {
      // Arrange
      const dto = new CreateCultureDto();
      dto.propertyId = 'a1b2c3d4-e5f6-4789-a012-3456789abcde';
      dto.cycle = 120;
      dto.origin = CultureOrigin.TRANSGENIC;

      // Act
      const errors = await validate(dto);

      // Assert
      expect(errors.length).toBe(0);
    });

    it('deve falhar quando origin está vazio', async () => {
      // Arrange
      const dto = new CreateCultureDto();
      dto.propertyId = 'a1b2c3d4-e5f6-4789-a012-3456789abcde';
      dto.cycle = 120;
      dto.origin = null as any;

      // Act
      const errors = await validate(dto);

      // Assert
      expect(errors.length).toBeGreaterThan(0);
      const originError = errors.find((e) => e.property === 'origin');
      expect(originError).toBeDefined();
      expect(originError?.constraints?.isNotEmpty).toBe(
        'Origem da cultura é obrigatória',
      );
    });

    it('deve falhar quando origin é undefined', async () => {
      // Arrange
      const dto = new CreateCultureDto();
      dto.propertyId = 'a1b2c3d4-e5f6-4789-a012-3456789abcde';
      dto.cycle = 120;

      // Act
      const errors = await validate(dto);

      // Assert
      expect(errors.length).toBeGreaterThan(0);
      const originError = errors.find((e) => e.property === 'origin');
      expect(originError).toBeDefined();
      expect(originError?.constraints?.isNotEmpty).toBe(
        'Origem da cultura é obrigatória',
      );
    });

    it('deve falhar quando origin tem valor inválido', async () => {
      // Arrange
      const dto = new CreateCultureDto();
      dto.propertyId = 'a1b2c3d4-e5f6-4789-a012-3456789abcde';
      dto.cycle = 120;
      dto.origin = 'invalido' as any;

      // Act
      const errors = await validate(dto);

      // Assert
      expect(errors.length).toBeGreaterThan(0);
      const originError = errors.find((e) => e.property === 'origin');
      expect(originError).toBeDefined();
      expect(originError?.constraints?.isEnum).toBe(
        'Origem deve ser organic, conventional ou transgenic',
      );
    });

    it('deve falhar quando origin é um número', async () => {
      // Arrange
      const dto = new CreateCultureDto();
      dto.propertyId = 'a1b2c3d4-e5f6-4789-a012-3456789abcde';
      dto.cycle = 120;
      dto.origin = 123 as any;

      // Act
      const errors = await validate(dto);

      // Assert
      expect(errors.length).toBeGreaterThan(0);
      const originError = errors.find((e) => e.property === 'origin');
      expect(originError).toBeDefined();
      expect(originError?.constraints?.isEnum).toBe(
        'Origem deve ser organic, conventional ou transgenic',
      );
    });
  });
});
